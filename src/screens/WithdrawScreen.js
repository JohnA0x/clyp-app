import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Switch,
  FlatList,
} from "react-native";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
  RoundedButton,
} from "../components/button";
import * as Strings from "../strings/strings";
import { styles } from "../styles/withdraw";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import { withdrawalList } from "../strings/withdrawlist";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProcessingModal } from "../components/modal";
import axiosFiat from "../components/axios-fait";
import axios from "axios";
import { CustomAlert } from "../components/alert";

const Stack = createNativeStackNavigator();

export default function WithdrawScreen({ route }) {
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState({})
  const [bankName, setBankName] = useState("Choose Bank");
  const [bankCode, setBankCode] = useState("");
  const [bank_id, setBankId] = useState("")
  // Return for Main Function
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="withdrawoptions" component={withdrawOptions} />

      <Stack.Screen name="accountwithdraw" component={accountWithdraw} />

      <Stack.Screen name={Strings.addBankAccount} component={AddBankAccount} />

      <Stack.Screen name={Strings.UseAnotherBankAccount} component={UseAnotherBankAccount} />

      <Stack.Screen name={"chooseBank"} component={banks} />
    </Stack.Navigator>
  );

  function accountWithdraw({ navigation, route }) {
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const [amount, setAmount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    const withdraw = () => {

      setIsVisible(true)
      let data = {
        amount: Number(amount),
        user_id: route.params.account.user_id,
        title: "Clyp Withdrawal",
        name: route.params.account.account_name,
        account_number: route.params.account.account_number,
        bank_id: route.params.account.bank_id,
        transaction_type: "send",
        bank_name: route.params.account.bank_name
      }

      console.log(data)

      axiosFiat.post('/fiat-gateway/send', data)
        .then(sent => {
          console.log(sent.data)
          if (sent.data.message === "success") {

          } else {
            // CustomAlert({ title: "Failed", subtitle: "Failed to send transaction", handlePress: () => { } })
          }
        })
        .catch(err => {
          console.log(err)
          // CustomAlert({ title: "Error", subtitle: err, handlePress: () => { } })
        })

    }

    useEffect(() => {
      console.log(route.params)
    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("withdrawoptions")}
          />
          <Text style={styles.headerText}>{Strings.withdraw}</Text>
        </View>

        <TouchableOpacity
          style={styles.bankAccountButton}
          onPress={() => navigation.navigate("accountwithdraw")}
        >
          <Image
            style={styles.bankIcon}
            source={require("../drawables/bitcoin.png")}
          />
          <Text style={styles.nameText}>{route.params.account.account_name}</Text>
          <Text style={styles.bankNameText}>{route.params.account.account_number}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.amountInput}
          placeholder={Strings.inputAmount}
          selectionColor={Colors.primary}
          onChangeText={(text) => {
            setAmount(text)
          }}
        />

        <RoundedButton
          style={styles.roundedButton}
          text={Strings.withdraw}
          textStyle={styles.roundedButtonText}
          handlePress={() => {
            withdraw()
          }}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function withdrawOptions({ navigation }) {
    //Withdrawal FlatList Design
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const [banks, setBanks] = useState([])

    const withdrawalFlatList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("accountwithdraw", {
              account: item
            });
            setBank(item)
            setAccountName(item.name);
            setAccountNumber(item.accountNumber);
          }}
        >
          <Image
            style={styles.bankIcon}
            source={require("../drawables/bitcoin.png")}
          />
          <Text style={styles.nameText}>{item.account_name}</Text>
          <Text style={styles.bankNameText}>{item.bank_name}</Text>
          <Text style={styles.accountNameText}>{item.account_number}</Text>
        </TouchableOpacity>
      </View>
    );

    useEffect(() => {
      axiosFiat.post('/fiat-gateway/get-bank-accounts', { user_id: route.params.user.id })
        .then(banks => {
          
          if (banks.data.message === "success") {
            
            setBanks(banks.data.banks)
          }
          else {
            // CustomAlert({ title: "Failed", subtitle: data.data.error, handlePress: () => { } })
          }
        })
        .catch(err => {
          // CustomAlert({ title: "Error", subtitle: err.error, handlePress: () => { } })
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
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={styles.headerText}>{Strings.withdraw}</Text>
        </View>

        <Text style={styles.text}>Choose Account to Withdraw Into</Text>

        <FlatList
          contentContainerStyle={styles.flatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={banks}
          renderItem={withdrawalFlatList}
        />

        <View style={styles.otherOptionsView}>
          <Text
            style={styles.addNewAccount}
            onPress={() => navigation.navigate(Strings.addBankAccount)}
          >
            Add New Account
          </Text>
          <Text style={styles.useAnotherAccount}
            onPress={() => navigation.navigate(Strings.UseAnotherBankAccount)}>
            Use Another Account Instead
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  function AddBankAccount({ navigation }) {
    // const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [isVisible, setIsVisible] = useState(false)

    const resolve = (text) => {
      let data = {
        bank_code: bankCode,
        account_number: text
      }
      console.log(text)
      setAccountNumber(text)
      if (text.length === 10 && bankName !== "Choose Bank") {

        axiosFiat.post('/fiat-gateway/resolve-account', data)
          .then(data => {
            console.log(data.data)
            setAccountName(data.data.account_name)
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        return
      }
    }

    const save = () => {
      let data = {
        account_name: accountName,
        account_number: accountNumber,
        bank_name: bankName,
        bank_code: bankCode,
        bank_id: bank_id,
        user_id: route.params.user.id
      }
      setIsVisible(true)
      // console.log(data.account_number)

      if (accountName === "") {
        return false
      } else {

        axiosFiat.post('/fiat-gateway/save-bank-account', data)
          .then(bank => {
            console.log(bank.data)
            navigation.goBack()
            setIsVisible(false)
          })
          .catch(err => {
            setIsVisible(false)
            console.log(err)
          })

      }

    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("withdrawoptions")}
          />
          <Text style={styles.headerText}>{Strings.addBankAccount}</Text>
        </View>

        <Text
          style={styles.otherTextInputs}
          placeholder="Bank Name"
          selectionColor={Colors.primary}
          onPress={() => navigation.navigate("chooseBank")}
        // maxLength={3}
        >{bankName}</Text>

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Account Number"
          selectionColor={Colors.primary}
          value={accountNumber}
          maxLength={10}
          keyboardType="numeric"
          onChangeText={(text) => {
            // setAccountNumber(text)
            resolve(text)
          }}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Name (auto-filled)"
          selectionColor={Colors.primary}
          editable={false}
          value={accountName}
        // maxLength={16}
        />

        <RoundedButton
          text="Proceed"
          textStyle={styles.roundedTextButton}
          style={styles.roundedAddButton}
          handlePress={() => {
            save()
          }}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function UseAnotherBankAccount({ navigation }) {

    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [isVisible, setIsVisible] = useState(false)

    const resolve = (text) => {
      let data = {
        bank_code: bankCode,
        account_number: text
      }
      console.log(text)
      setAccountNumber(text)
      if (text.length === 10 && bankName !== "Choose Bank") {

        axiosFiat.post('/fiat-gateway/resolve-account', data)
          .then(data => {
            console.log(data.data)
            setAccountName(data.data.account_name)
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        return
      }
    }

    const save = () => {
      let data = {
        account_name: accountName,
        account_number: accountNumber,
        bank_name: bankName,
        bank_code: bankCode,
        bank_id: bank_id,
        user_id: route.params.user.id
      }
      setIsVisible(true)
      // console.log(data.account_number)

      if (accountName === "") {
        return false
      } else {

        axiosFiat.post('/fiat-gateway/save-bank-account', data)
          .then(bank => {
            console.log(bank.data)
            navigation.goBack()
            setIsVisible(false)
          })
          .catch(err => {
            setIsVisible(false)
            console.log(err)
          })

      }

    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("withdrawoptions")}
          />
          <Text style={styles.headerText}>{Strings.addBankAccount}</Text>
        </View>

        <Text
          style={styles.otherTextInputs}
          placeholder="Bank Name"
          selectionColor={Colors.primary}
          onPress={() => navigation.navigate("chooseBank")}
        // maxLength={3}
        >{bankName}</Text>

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Account Number"
          selectionColor={Colors.primary}
          value={accountNumber}
          maxLength={10}
          keyboardType="numeric"
          onChangeText={(text) => {
            // setAccountNumber(text)
            resolve(text)
          }}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Name (auto-filled)"
          selectionColor={Colors.primary}
          editable={false}
          value={accountName}
        // maxLength={16}
        />

        <RoundedButton
          text="Proceed"
          textStyle={styles.roundedTextButton}
          style={styles.roundedAddButton}
          handlePress={() => {
            save()
          }}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function banks({ navigation }) {

    const [banks, setBanks] = useState([])


    useEffect(() => {
      axios.get('https://api.getbrass.co/banking/banks?page=1&limit=89', {
        headers: {
          Authorization: `Bearer 6099|pat-NSY7IMOQm9zwUAqVTLkLwkebwc72mW15Vj4BYDOM`
        }
      })
        .then(data => {
          // console.log(data.data.data)
          setBanks(data.data.data)
          console.log(data.data.data[0])
        })
        .catch(err => {
          console.log(err)
        })
    }, [])

    const bankList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.goBack();
              setBankName(item.name)
              setBankId(item.id)
              setBankCode(item.code)
            }}
          >
            <Text style={styles.valueText}>{item.name} </Text>

          </TouchableOpacity>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Choose Bank</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.flatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={banks}
          renderItem={bankList}
        />

      </SafeAreaView>
    )
  }
}
