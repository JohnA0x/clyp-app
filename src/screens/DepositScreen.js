import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
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
import { ProcessingModal } from "../components/modal";
import { AddCard } from "./PreferencesScreen";
import { useSelector, useDispatch } from "react-redux";
import { CustomAlert } from "../components/alert";

import axiosFiat from "../components/axios-fait";

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
        component={DepositviaDebitCard}
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
    </Stack.Navigator>
  );

  function DepositOptions({ navigation }) {
    const depositOptions = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.flatlist}]}
          onPress={() => navigation.navigate(item.title)}
        >
          <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.headerImage}
          />
          <Text style={[styles.title, {color: theme.text}]}>{item.title}</Text>
          <Text style={[styles.subtitle, {color: theme.text}]}>{item.subtitle}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={[styles.headerText, {color: theme.text}]}>{Strings.fund}</Text>
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
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
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
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate('depositscreen')}
          />
          <Text style={[styles.headerText, {color: theme.text}]}>{Strings.depositviaBank}</Text>
        </View>

        <View>
          <Text style={[styles.titleText, {color: theme.primary}]}>ACCOUNT NUMBER</Text>
          <Text style={[styles.detailsText, {color: theme.text}]}>{route.params.wallet.number}</Text>
          <Ionicons
          name="copy"
          size={20}
          color={theme.primary}
          style ={styles.copyButton}/>
        </View>


        <View>
          <Text style={[styles.titleText, {color: theme.primary}]}>ACCOUNT NAME</Text>
          <Text style={[styles.detailsText, {color: theme.text}]}>{route.params.wallet.name}</Text>
          <Ionicons
          name="copy"
          size={20}
          color={theme.primary}
          style ={styles.copyButton}/>
        </View>

        <View>
          <Text style={[styles.titleText, {color: theme.primary}]}>BANK</Text>
          <Text style={[styles.detailsText, {color: theme.text}]}>{route.params.wallet.bank_name}</Text>
          <Ionicons
          name="copy"
          size={20}
          color={theme.primary}
          style ={styles.copyButton}/>
        </View>

        <View>
          <Text style={[styles.titleText, {color: theme.primary}]}>SORT CODE</Text>
          <Text style={[styles.detailsText, {color: theme.text}]}>{route.params.wallet.bank_code}</Text>
          <Ionicons
          name="copy"
          size={20}
          color={theme.primary}
          style ={styles.copyButton}/>
        </View>
       
        <RoundedButton
          style={[styles.roundedButton, {top: 40,}]}
          text='Share Account Details'
          textStyle={styles.roundedTextButton}
        />
       
      </SafeAreaView>
    );
  }

  function AddBankAccount() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
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

  // function AddCardd({ navigation, route }) {
  //   const [cardNumber, setCardNumber] = useState("");
  //   const [cvvNumber, setCVVNumber] = useState("");
  //   const [expiryNumber, setExpiryNumber] = useState("");
  //   const [cardName, setCardName] = useState("");
  //   const [cardType, setCardType] = useState("");
  //   const [cardPin, setCardPin] = useState("");
  //   const [loading, setLoading] = useState(false);
  
  //   const submit = () => {
  //     setLoading(true)
  
  //     let data = {
  //       card_number: cardNumber,
  //       cvv: cvvNumber,
  //       card_expiry: expiryNumber,
  //       card_type: cardType,
  //       card_name: cardName,
  //       card_pin: cardPin,
  //       user_id: route.params.params.id
  //     }
      
  //     if(data.card_number === "" || data.cvv === "" || data.card_expiry === ""){
  //       setLoading(false)
  //       return false
  //     }
  //     axiosFiat.post('/fiat-gateway/save-card', data)
  //       .then(data => {
  //         if (data.data.message === "success") {
  //           setLoading(false)
  //           navigation.navigate(Strings.paymentmethod, {
  //             id: route.params.params.id,
  //             firstName: route.params.params.firstName,
  //             lastName: route.params.params.lastName,
  //             preferences: route.params.params.preferences,
  //             user: route.params.params.user,
  //           })
  //         } else {
  //           setLoading(false)
  //           CustomAlert({
  //             title: "Failed",
  //             subtitle: "Problem adding card.",
  //             handlePress: () => { },
  //           });
  //         }
  //       })
  //       .catch(err => {
  //         setLoading(false)
  //         CustomAlert({
  //           title: "Failed",
  //           subtitle: "Problem adding card.",
  //           handlePress: () => { },
  //         });
  //       })
  //   }
  
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <View style={styles.preferencesHeader}>
  //         <VectorButton
  //           name="chevron-back"
  //           size={24}
  //           color={Colors.textColor}
  //           style={styles.backButton}
  //           handlePress={() => navigation.goBack({
  //             id: route.params.params.id,
  //             firstName: route.params.params.firstName,
  //             lastName: route.params.params.lastName,
  //             preferences: route.params.params.preferences,
  //             user: route.params.params.user,
  //           })}
  //         />
  //         <Text style={styles.headerText}>{Strings.addNewCard}</Text>
  //       </View>
  
  //       <TextInput
  //         style={styles.inputText2}
  //         placeholder="Card Name"
  //         selectionColor={Colors.primary}
  //         value={cardName}
  //         onChangeText={(value) => setCardName(value)}
  //       />
  
  //       <TextInput
  //         style={styles.otherTextInputs2}
  //         placeholder="Card Number"
  //         selectionColor={Colors.primary}
  //         maxLength={16}
  //         value={cardNumber}
  //         onChangeText={(value) => setCardNumber(value)}
  //       />
  
  //       <View style={styles.rowCardContainer}>
  //         <TextInput
  //           style={styles.rowTextInputs}
  //           placeholder="Expiry Date"
  //           selectionColor={Colors.primary}
  //           maxLength={5}
  //           value={expiryNumber}
  //           onChangeText={(value) => setExpiryNumber(value)}
  //         />
  
  //         <TextInput
  //           style={styles.rowTextInputs}
  //           placeholder="CVV"
  //           selectionColor={Colors.primary}
  //           maxLength={3}
  //           value={cvvNumber}
  //           onChangeText={(value) => setCVVNumber(value)}
  //         />
  //       </View>
  
        
  
  //       <RoundedButton
  //         text="Add Card"
  //         textStyle={styles.roundedTextButton}
  //         style={styles.roundedButton}
  //         handlePress={() => submit()}
  //       />
  
  //       <ProcessingModal isVisible={loading} />
  //     </SafeAreaView>
  //   );
  // }
}
