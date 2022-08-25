import { React, useState } from "react";
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

  function accountWithdraw({ navigation }) {
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
        />

        <RoundedButton
          style={styles.roundedButton}
          text={Strings.withdraw}
          textStyle={styles.roundedButtonText}
        />
      </SafeAreaView>
    );
  }

  function withdrawOptions({ navigation }) {
    //Withdrawal FlatList Design
    const withdrawalFlatList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("accountwithdraw");
            setAccountName(item.name);
            setAccountNumber(item.accountNumber);
          }}
        >
          <Image
            style={styles.bankIcon}
            source={require("../drawables/bitcoin.png")}
          />
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.bankNameText}>{item.bank}</Text>
          <Text style={styles.accountNameText}>{item.accountNumber}</Text>
        </TouchableOpacity>
      </View>
    );

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
          data={withdrawalList}
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
