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
import { CustomAlert } from "../components/alert";

const Stack = createNativeStackNavigator();

export default function WithdrawScreen({ route }) {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
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
    </Stack.Navigator>
  );

  function accountWithdraw({ navigation, route }) {

    const [amount, setAmount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    const withdraw = () => {

      setIsVisible(true)
      let data = {
        amount: Number(amount),
        user_id: route.params.user.id,
        title: "Clyp Withdrawal",
        name: route.params.account_name,
        account_number: route.params.account_number,
        bank_id: route.params.bank_id,
        transaction_type: "send",
        bank_name: route.params.bank_name
      }

      axiosFiat.post('/fiat-gateway/send', data)
        .then(sent => {
          if (sent.data.message === "success") {

          } else {
            CustomAlert({ title: "Failed", subtitle: "Failed to send transaction", handlePress: () => { } })
          }
        })
        .catch(err => {
          CustomAlert({ title: "Error", subtitle: err, handlePress: () => { } })
        })

    }

    useEffect(() => {
      console.route.params
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
          <Text style={styles.nameText}>{accountName}</Text>
          <Text style={styles.bankNameText}>{accountNumber}</Text>
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
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function withdrawOptions({ navigation }) {
    //Withdrawal FlatList Design
    const [banks, setBanks] = useState([])
    const withdrawalFlatList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("accountwithdraw", {
              account: item
            });
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
        console.log(data.data)
        if (data.data.message === "success") {
        
          setBanks(data.data.banks)
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

  function AddBankAccount({navigation}) {
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
          style={styles.roundedAddButton}
          handlePress={() => {
            navigation.navigate("Complete Use Card");
          }}
        />
      </SafeAreaView>
    );
  }

  function UseAnotherBankAccount({navigation}) {
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
          <Text style={styles.headerText}>{Strings.UseAnotherBankAccount}</Text>
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
          style={styles.roundedAddButton}
          handlePress={() => {
            navigation.navigate("Complete Use Card");
          }}
        />
      </SafeAreaView>
    );
  }
}
