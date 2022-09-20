import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/deposit";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import * as Values from "../constants/values";
import {
  FileImageButton,
  ImageButton,
  RoundedButton,
  VectorButton,
} from "../components/button";
import { listSeparator } from "../components/listseparator";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";
import {
  depositListArray,
  depositCardList,
  bankAccountList,
} from "../strings/depositlist";
import cryptoListArray from "../strings/cryptolist";
import { ProcessingModal, SuccessModal } from "../components/modal";
import { AddCard } from "./PreferencesScreen";
import { useSelector, useDispatch } from "react-redux";
import { CustomAlert } from "../components/alert";

import axiosFiat from "../components/axios-fait";
import { styles2 } from "../styles/buycrypto";
import { KeycodeInput } from "react-native-keycode";

import * as Clipboard from 'expo-clipboard';

const Stack = createNativeStackNavigator();

export default function DepositScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [priceChange, setPriceChange] = useState("");
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);

  // This is the state that defines a card properties when clicked on
  const [cardOptions, setCardOptions] = useState([
    {
      cardName: "",
      cardType: "",
      cardNumber: "",
      securityCode: "",
      expiryDate: "",
    },
  ]);

  const [cardNumber, setCardNumber] = useState("");

  const [cardInputOptions, setCardInputOptions] = useState([
    { cardNumber: "", expiryDate: "", securityCode: "", amount: "0", pin: "" },
  ]);

  const priceChangeColor = priceChange > 0 ? "#009E06" : "";
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='depositscreen'
        initialParams={route}
        component={DepositOptions}
      />

      <Stack.Screen
        name={Strings.depositviaCrypto}
        component={CryptoOptions}
        initialParams={route}
      />

      <Stack.Screen
        name="TransactionsOptions"
        component={TransactionsOptions}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.depositviaDebit}
        component={BuyWithCard}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.addBankAccount}
        component={AddBankAccount}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.depositviaBank}
        component={DepositViaBank}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.addNewCard}
        component={AddCard}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.UseAnotherCard}
        component={UseAnotherCard}
        initialParams={route}
      />

      <Stack.Screen
        name="Complete Use Card"
        component={CompleteUseCard}
        initialParams={route}
      />


      <Stack.Screen
        name="cardpin"
        component={CardPin}
        initialParams={route}
      />

      <Stack.Screen
        name="inputotp"
        component={InputOTP}
        initialParams={route}
      />

      <Stack.Screen
        name="address"
        component={Address}
        initialParams={route}
      />

    </Stack.Navigator>
  );

  function DepositOptions({ navigation }) {
    const depositOptions = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.flatlist }]}
          onPress={() => navigation.navigate(item.title)}
        >
          <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.headerImage}
          />
          <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>{item.subtitle}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>{Strings.fund}</Text>
        </View>
        <FlatList
          //contentContainerStyle={styles.flatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={depositListArray}
          renderItem={depositOptions}
        />
      </SafeAreaView>
    );
  }

  function CryptoOptions() {
    const sendCryptoList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.push("TransactionsOptions");
            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({ abb: item.abb });
          }}
        >
          <Image source={{ uri: item.icon }} style={styles.image} />
          <Text style={styles.valueText}>{item.value}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate('depositscreen')}
          />
          <Text style={styles.headerText}>{Strings.fund}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={sendCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }

  function TransactionsOptions() {
    const [amount, setAmount] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const fund = () => {
      setIsVisible(true)
      let data = {
        amount,
        user_id: route.params.user.id
      }
    }

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate('depositscreen')}
          />
          <Text style={styles.headerText}>{Strings.fund}</Text>
        </View>

        <View style={styles.transactionCryptoContainer}>
          <Image style={styles.cryptoImage} source={{ uri: cryptoIcon }} />
          <Text style={styles.cryptoText}>{cryptoName}</Text>
        </View>

        <View style={styles.transactionAmountContainer}>
          <Text style={styles.amountText}>Amount:</Text>
          <TextInput
            style={styles.amountValueText}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            selectionColor={Colors.primary}
            onChangeText={(texx) => {
              setAmount(text)
            }}
          ></TextInput>
          <Text style={styles.amountMaxValue}>Max</Text>
        </View>

        <View style={styles.lineCrosser} />
        <Text style={styles.receiveAmount}>
          You will receive N20,000 in Naira
        </Text>
        <Text style={styles.conversionAmount}>1 BTC = $23,000</Text>
        <RoundedButton
          style={styles.depositButton}
          text={Strings.deposit}
          textStyle={styles.depositText}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function DepositViaBank() {
    const accountList = ({ item }) => {
      return (
        <View style={styles.cardRowContainer}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => {
              navigation.navigate("accountwithdraw");
            }}
          >
            <Image style={styles.bankIcon} source={{ uri: item.bankIcon }} />
            <Text style={styles.nameText}>{item.bankAccountName}</Text>
            <Text style={styles.bankNameText}>{item.bank}</Text>
            <Text style={styles.accountNameText}>{item.bankAccountNumber}</Text>
            <Ionicons
              name="copy"
              size={20}
              color={Colors.primary}
              style={styles.cardCopyButton}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate('depositscreen')}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>{Strings.depositviaBank}</Text>
        </View>

        <View
        onPress={async () => {
          await Clipboard.setStringAsync(route.params.wallet.number)
          CustomAlert({title: "Copied", subtitle: "Your accoont number has been successfully copied"})
        }}>
          <Text style={[styles.titleText, { color: theme.primary }]}>ACCOUNT NUMBER</Text>
          <Text style={[styles.detailsText, { color: theme.text }]}>{route.params.wallet.number}</Text>
          <Ionicons
            name="copy"
            size={20}
            color={theme.primary}
            style={styles.copyButton} />
        </View>


        <View
          onPress={async () => {
            await Clipboard.setStringAsync(route.params.wallet.name)
            CustomAlert({ title: "Copied", subtitle: "Your account name has been successfully copied" })
          }}>
          <Text style={[styles.titleText, { color: theme.primary }]}>ACCOUNT NAME</Text>
          <Text style={[styles.detailsText, { color: theme.text }]}>{route.params.wallet.name}</Text>
          <Ionicons
            name="copy"
            size={20}
            color={theme.primary}
            style={styles.copyButton} />
        </View>

        <View
            onPress={async () => {
            await Clipboard.setStringAsync(route.params.wallet.bank_name)
            CustomAlert({title: "Copied", subtitle: "Your bank name has been successfully copied"})
          }}>
          <Text style={[styles.titleText, { color: theme.primary }]}>BANK</Text>
          <Text style={[styles.detailsText, { color: theme.text }]}>{route.params.wallet.bank_name}</Text>
          <Ionicons
            name="copy"
            size={20}
            color={theme.primary}
            style={styles.copyButton} />
        </View>

        <View
            onPress={async () => {
            await Clipboard.setStringAsync(route.params.wallet.bank_code)
            CustomAlert({title: "Copied", subtitle: "Your bank code has been successfully copied"})
          }}>
          <Text style={[styles.titleText, { color: theme.primary }]}>SORT CODE</Text>
          <Text style={[styles.detailsText, { color: theme.text }]}>{route.params.wallet.bank_code}</Text>
          <Ionicons
            name="copy"
            size={20}
            color={theme.primary}
            style={styles.copyButton} />
        </View>

        <RoundedButton
          style={[styles.roundedButton, { top: 40, }]}
          text='Share Account Details'
          textStyle={styles.roundedTextButton}
        />

      </SafeAreaView>
    );
  }

  function AddBankAccount() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.depositviaBank)}
          />
          <Text style={styles.headerText}>{Strings.addBankAccount}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Name"
          selectionColor={Colors.primary}
          maxLength={16}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Account Number"
          selectionColor={Colors.primary}
          maxLength={5}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Bank Name"
          selectionColor={Colors.primary}
          maxLength={3}
          keyboardType="numeric"
        />

        <RoundedButton
          text="Proceed"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => {
            navigation.navigate("Complete Use Card");
          }}
        />
      </SafeAreaView>
    );
  }

  function DepositviaDebitCard() {
    const [cards, setCards] = useState([])
    //Withdrawal FlatList Design
    const cardList = ({ item }) => (
      <View style={styles.cardRowContainer}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => {
            navigation.navigate("accountwithdraw");
            setCardOptions(item);
          }}
        >
          <Image style={styles.bankIcon} source={{ uri: item.cardImage }} />
          <Text style={styles.nameText}>{item.card_name}</Text>
          <Text style={styles.bankNameText}>{item.card_type}</Text>
          <Text style={styles.accountNameText}>{item.card_number}</Text>
        </TouchableOpacity>
      </View>
    );

    useEffect(() => {
      axiosFiat.post('/fiat-gateway/get-cards', { user_id: route.params.user.id })
        .then(data => {
          if (data.data.message === "success") {
            setCards(data.data.cards)
          }
          else {
            CustomAlert({ title: "Failed", subtitle: "Failed to get cards...", handlePress: () => { } })
          }
        })
        .catch(err => {
          console.log(err)
          CustomAlert({ title: "Error", subtitle: "Error fetching cards...", handlePress: () => { } })
        })
    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate('depositscreen')}
          />
          <Text style={styles.headerText}>{Strings.depositviaDebit}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.cardFlatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={cards}
          renderItem={cardList}
        />
        <View style={styles.otherOptionsView}>
          <Text
            style={styles.addNewAccount}
            onPress={() => navigation.navigate(Strings.addNewCard)}
          >
            Add New Card
          </Text>
          {/* <Text
            style={styles.useAnotherAccount}
            onPress={() => navigation.navigate(Strings.UseAnotherCard)}
          >
            Use Another Card
          </Text> */}
        </View>
      </SafeAreaView>
    );
  }

  function UseAnotherCard() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.depositviaDebit)}
          />
          <Text style={styles.headerText}>{Strings.UseAnotherCard}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Card Number"
          selectionColor={Colors.primary}
          maxLength={16}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Expiry Date"
          selectionColor={Colors.primary}
          maxLength={5}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Security Code"
          selectionColor={Colors.primary}
          maxLength={3}
          keyboardType="numeric"
        />

        <RoundedButton
          text="Proceed"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => {
            navigation.navigate("Complete Use Card");
          }}
        />
      </SafeAreaView>
    );
  }

  function CompleteUseCard() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.depositviaDebit)}
          />
          <Text style={styles.headerText}>{Strings.UseAnotherCard}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Amount"
          selectionColor={Colors.primary}
          maxLength={16}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Transaction Pin"
          selectionColor={Colors.primary}
          maxLength={5}
          keyboardType="numeric"
        />

        <RoundedButton
          text="Deposit"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submit()}
        />
      </SafeAreaView>
    );
  }

  function BuyWithCard() {
    const [amount, setAmount] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [cards, setCards] = useState([]);
    const [checkmarkColor, setCheckmarkColor] = useState();
    const [card, setCard] = useState();
    const [pin, setPin] = useState();
    const [flw, setFLW] = useState();
    const [otp, setOTP] = useState();

    const start_charge = () => {
      setIsVisible(true);

      let card_data = {
        card_number: card.card_number,
        cvv: card.cvv,
        card_expiry_month: card.card_expiry.slice(0, card.card_expiry.indexOf('/')),
        card_expiry_year: card.card_expiry.slice(card.card_expiry.indexOf('/') + 1),
        card_name: card.card_name,
        amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
      };

      axiosFiat
        .post("/fiat-gateway/charge-card", card_data)
        .then((resp) => {
          setIsVisible(false);
          console.log(resp.data)
          if (resp.data.auth_mode === "pin") {
            navigation.navigate("cardpin", { card: card, amount: amount, user: route.params.user })
          } else if (resp.data.auth_mode === "redirect") {

          } else if (resp.data.auth_mode === "avs_noauth") {
            navigation.navigate("address", { card: card, amount: amount, user: route.params.user })
          } else if (resp.data.transaction) {

          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };

    useEffect(() => {
      axiosFiat
        .post("/fiat-gateway/get-cards", { user_id: route.params.user.id })
        .then((data) => {
          if (data.data.message === "success") {
            setCards(data.data.cards);
            setCheckmarkColor(data.data.cards[0].id);
            setCard(data.data.cards[0])
            console.log(data.data.cards[0].id);
          } else {
            // CustomAlert({ title: "Failed", subtitle: data.data.error, handlePress: () => { } })
          }
        })
        .catch((err) => {
          // CustomAlert({ title: "Error", subtitle: err.error, handlePress: () => { } })
        });
    }, []);

    const cardList = ({ item }) => {
      return (
        <View style={styles2.cardViewContainer}>
          <TouchableOpacity
            style={[styles2.cardsContainer, { backgroundColor: Colors.black }]}
            onPress={() => {
              setCheckmarkColor(item.id);
              setCard(item);
            }}
          >
            <VectorButton
              name={item.icon}
              size={24}
              color={Colors.primary}
              style={styles2.preferencesimage}
            />
            <Text style={styles2.cardNameText}>{item.card_name}</Text>
            <Image style={styles2.cardIcon} />
            <Text style={styles2.cardNumberText}>{item.card_number}</Text>
            <Text style={styles2.cardValidThruText}>VALID THRU</Text>
            <Text style={styles2.cardValidityText}>{item.card_expiry}</Text>
            <Text style={styles2.cardCVVText}>CVV</Text>
            <Text style={styles2.cardCVV}>{item.cvv}</Text>
            <Ionicons
              name={"checkmark-circle"}
              size={24}
              style={styles2.selectedIcon}
              color={checkmarkColor === item.id ? Colors.addGoal : Colors.grey}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles2.container}>
        <View style={styles2.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles2.backButton}
            handlePress={() => navigation.navigate("depositscreen")}
          />
          <Text style={styles2.headerText}>{Strings.buy}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles2.cardListContainer}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={cards}
          renderItem={cardList}
          ListEmptyComponent={<Text>No debit cards added yet</Text>}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />

        {/* <View style={styles2.cardCryptoContainer}>
          <Image style={styles2.cryptoImage} source={{ uri: cryptoIcon }} />
          <Text style={styles2.cryptoText}>{cryptoName}</Text>
        </View> */}

        <View style={styles2.cardAmountContainer}>
          <Text style={styles2.amountText}>Amount:</Text>
          <TextInput
            style={styles2.amountValueText}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            selectionColor={Colors.primary}
            onChangeText={(text) => setAmount(text)}
          // value={Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          ></TextInput>
          {/* <Text style={styles.amountMaxValue}>Max</Text> */}
        </View>

        <View style={styles2.lineCrosser} />
        <Text style={styles2.receiveAmount}>
          You will receive N{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} in Naira
        </Text>

        <RoundedButton
          style={styles2.cardDepositButton}
          text={Strings.deposit}
          textStyle={styles2.depositText}
          handlePress={() => start_charge()}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function CardPin({ route }) {
    const [pin, setPin] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      console.log({
        route_params: route
      })
    }, [])

    const charge_pin = () => {
      setIsVisible(true);

      let card_data = {
        card_number: route.params.card.card_number,
        cvv: route.params.card.cvv,
        card_expiry_month: route.params.card.card_expiry.slice(0, route.params.card.card_expiry.indexOf('/')),
        card_expiry_year: route.params.card.card_expiry.slice(route.params.card.card_expiry.indexOf('/') + 1),
        card_name: route.params.card.card_name,
        amount: route.params.amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
        pin: pin,
      };

      axiosFiat
        .post("/fiat-gateway/card-pin", card_data)
        .then((data) => {
          setIsVisible(false);
          if (data.data.message === "otp required") {
            // setFLW(data.data.flw_ref);
            navigation.navigate("inputotp", { flw: data.data.flw_ref, user: route.params.user })
          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles2.header}>
            <VectorButton
              name="chevron-back"
              size={24}
              color={Colors.textColor}
              style={styles2.backButton}
              handlePress={() => navigation.navigate(Strings.depositviaDebit)}
            />
            <Text style={styles2.headerText}>Card Pin</Text>
          </View>

          <Text style={styles2.enterPinText}>Enter Your Card Pin</Text>
          <KeycodeInput
            tintColor={Colors.primary}
            textColor={Colors.textColor}
            style={styles2.pin}
            numeric={true}
            alphaNumeric={false}
            onComplete={(value) => {
              setPin(value);
            }}
          />

          <RoundedButton
            style={styles2.nextButton}
            text={Strings.next}
            textStyle={styles2.depositText}
            handlePress={() => charge_pin()}
          />
        </ScrollView>
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function InputOTP({ route }) {
    const [code, setCode] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [success, setSuccess] = useState(false);

    const charge_otp = () => {
      setIsVisible(true);
      let otp_data = {
        otp: code,
        flw_ref: route.params.flw,
        user_id: route.params.user.id,
      };

      axiosFiat
        .post("/fiat-gateway/card-otp", otp_data)
        .then((fianl) => {
          setIsVisible(false);
          if (fianl.data.message === "success") {
            setSuccess(true);
          }
          else {
            CustomAlert({ title: "Failed", subtitle: "Failed to charge card, please check details provided", handlePress: () => { } })
          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };


    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles2.header}>
            <VectorButton
              name="chevron-back"
              size={24}
              color={Colors.textColor}
              style={styles2.backButton}
              handlePress={() => navigation.navigate("cardpin")}
            />
            <Text style={styles2.headerText}>Input OTP</Text>
          </View>

          <Text style={styles2.enterPinText}>An OTP has been sent to card phone number and email</Text>

          <TextInput

            style={styles2.otherTextInputs}
            numeric={true}
            alphaNumeric={false}
            onChangeText={(value) => {
              setCode(value);
            }}
          />

          <RoundedButton
            style={styles2.nextButton}
            text={Strings.next}
            textStyle={styles2.depositText}
            handlePress={() => charge_otp()}
          />

          <SuccessModal isVisible={success} handlePress={() => {
            setSuccess(false)
            navigation.navigate(Strings.home)
          }} />
          <ProcessingModal isVisible={isVisible} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Address({ navigation, route }) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setCardState] = useState("");
    const [zip, setZip] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [success, setSuccess] = useState(false);

    const charge_card = () => {
      setIsVisible(true);

      let card_data = {
        card_number: route.params.card.card_number,
        cvv: route.params.card.cvv,
        card_expiry_month: route.params.card.card_expiry.slice(0, route.params.card.card_expiry.indexOf('/')),
        card_expiry_year: route.params.card.card_expiry.slice(route.params.card.card_expiry.indexOf('/') + 1),
        card_name: route.params.card.card_name,
        amount: route.params.amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
        address,
        city,
        country,
        state,
        zipcode: zip
      };

      axiosFiat
        .post("/fiat-gateway/card-no-auth", card_data)
        .then((data) => {
          setIsVisible(false);
          console.log(card_data)
          console.log(data.data)
          if (data.data.message === "otp required") {
            // setFLW(data.data.flw_ref);
            navigation.navigate("inputotp", { flw: data.data.flw_ref, user: route.params.user })
          } else if (data.data.message === "success") {
            setSuccess(true);
          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.preferencesHeader}>
            <VectorButton
              name="chevron-back"
              size={24}
              color={Colors.textColor}
              style={styles.backButton}
              handlePress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Card Address</Text>
          </View>

          <TextInput
            style={styles.inputText2}
            placeholder="Address"
            selectionColor={Colors.primary}

            onChangeText={(value) => setAddress(value)}
          />

          <TextInput
            style={styles.otherTextInputs2}
            placeholder="City"
            selectionColor={Colors.primary}
            maxLength={16}

            onChangeText={(value) => setCity(value)}
          />

          <TextInput
            style={styles.otherTextInputs2}
            placeholder="Country"
            selectionColor={Colors.primary}
            maxLength={16}

            onChangeText={(value) => setCountry(value)}
          />

          <View style={styles.rowCardContainer}>
            <TextInput
              style={styles.rowTextInputs}
              placeholder="State"
              selectionColor={Colors.primary}
              maxLength={5}

              onChangeText={(value) => setCardState(value)}
            />

            <TextInput
              style={styles.rowTextInputs}
              placeholder="Zip code"
              selectionColor={Colors.primary}


              onChangeText={(value) => setZip(value)}
            />
          </View>



          <RoundedButton
            text="Submit"
            textStyle={styles.roundedTextButton}
            style={styles.roundedButton}
            handlePress={() => charge_card()}
          />

          <ProcessingModal isVisible={isVisible} />
          <SuccessModal isVisible={success} handlePress={() => {
            setSuccess(false)
            navigation.navigate(Strings.home)
          }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
