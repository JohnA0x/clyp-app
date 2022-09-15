import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { styles } from "../styles/clyphub";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import CABLESVG from "../drawables/vector/billpay/cable.svg";
import EDUCATIONSVG from "../drawables/vector/billpay/education.svg";
import FLIGHTSVG from "../drawables/vector/billpay/flightbooking.svg";
import INTERNETSVG from "../drawables/vector/billpay/internet.svg";
import INSURANCESVG from "../drawables/vector/billpay/insurance.svg";
import TAXESSVG from "../drawables/vector/billpay/taxes.svg";
import UTILITYSVG from "../drawables/vector/billpay/utility.svg";
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as DropDownList from "../strings/hublist";
import DropDownPicker from "react-native-dropdown-picker";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function BillPayScreen({ navigation, route }) {
  const [networkValue, setNetworkValue] = useState(false);
  const [open, setOpen] = useState(null);
  const [networkList, setNetworkList] = useState(
    DropDownList.rechargeDropDownArray
  );

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="bill" component={BillPay} />
      <Stack.Screen name={Strings.internet} component={InternetServices} />
      <Stack.Screen name={Strings.cable} component={Cable} />
      <Stack.Screen name={Strings.utility} component={Utility} />
      <Stack.Screen name={Strings.education} component={Education} />
      <Stack.Screen name={Strings.flight} component={Flight} />
      <Stack.Screen name={Strings.insurance} component={Insurance} />
      <Stack.Screen name={Strings.taxes} component={Taxes} />
    </Stack.Navigator>
  );

  function BillPay() {
    const [open, setOpen] = useState(null);
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.clyphub)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.bill}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Strings.internet)}
            >
              <INTERNETSVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(Strings.cable)}
            >
              <CABLESVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Strings.utility)}
            >
              <UTILITYSVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(Strings.education)}
            >
              <EDUCATIONSVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Strings.insurance)}
            >
              <INSURANCESVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(Strings.taxes)}
            >
              <TAXESSVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>
          </View>

          {/*  <View style={styles.rowContainer}>
            <TouchableOpacity
             onPress={() => navigation.navigate(Strings.taxes)}>
              <TAXESSVG
                width={Values.clyphubsvgwidth}
                height={Values.clyphubsvgheight}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }

  function InternetServices() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.internet}
          </Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              labelStyle={{ color: theme.text }}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
              style={[
                styles.addressInput,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Reference Number"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <DropDownPicker
              style={[
                styles.selectPlanPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              labelStyle={{ color: theme.text }}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Amount"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Pin"
              placeholderTextColor={theme.text}
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Cable() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.cable}
          </Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              dropDownContainerStyle={[
                styles.dropDownContainerPicker,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              labelStyle={{ color: theme.text }}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
              style={[
                styles.addressInput,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Reference Number"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <DropDownPicker
              style={[
                styles.selectPlanPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Amount"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Pin"
              placeholderTextColor={theme.text}
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Utility() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.utility}
          </Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              labelStyle={{ color: theme.text }}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
              style={[
                styles.addressInput,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Reference Number"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <DropDownPicker
               style={[
                styles.selectPlanPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Amount"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Pin"
              placeholderTextColor={theme.text}
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Education() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.education}
          </Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              labelStyle={{ color: theme.text }}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
              style={[
                styles.addressInput,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Reference Number"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <DropDownPicker
              style={[
                styles.selectPlanPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              labelStyle={{ color: theme.text }}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Amount"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <TextInput
               style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Pin"
              placeholderTextColor={theme.text}
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Flight() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.flight}
          </Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
              style={styles.addressInput}
              placeholder="Reference Number"
              selectionColor={Colors.primary}
            />
            <DropDownPicker
              style={styles.selectPlanPicker}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
              style={styles.otherTextInputs}
              placeholder="Amount"
              selectionColor={Colors.primary}
            />
            <TextInput
              style={styles.otherTextInputs}
              placeholder="Pin"
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Insurance() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.insurance}
          </Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              labelStyle={{ color: theme.text }}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
               style={[
                styles.addressInput,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Reference Number"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <DropDownPicker
               style={[
                styles.selectPlanPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              labelStyle={{ color: theme.text }}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
               style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Amount"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Pin"
              placeholderTextColor={theme.text}
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Taxes() {
    const [planOpen, setPlanOpen] = useState(null);
    const [payeeOpen, setPayeeOpen] = useState(null);
    const [payeeList, setPayeeList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planList, setPlanList] = useState(
      DropDownList.rechargeDropDownArray
    );
    const [planValue, setPlanValue] = useState(false);
    const [payeeValue, setPayeeValue] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("bill")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>{Strings.taxes}</Text>
        </View>

        <View style={styles.fiatBalanceContainer}>
          <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
          <Text style={styles.fiatBalanceValueText}>N35,000</Text>
        </View>

        <ScrollView>
          <View>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              zIndex={600}
              labelStyle={{ color: theme.text }}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={payeeOpen}
              value={payeeValue}
              items={payeeList}
              setOpen={setPayeeOpen}
              setValue={setPayeeValue}
              setItems={setPayeeList}
              placeholder="Select Payee"
            />

            <TextInput
               style={[
                styles.addressInput,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Reference Number"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <DropDownPicker
              style={[
                styles.selectPlanPicker,
                { backgroundColor: theme.textinput },
              ]}
              dropDownContainerStyle={styles.dropDownContainerPicker}
              labelStyle={{ color: theme.text }}
              zIndex={600}
              dropDownDirection="AUTO"
              stickyHeader={true}
              open={planOpen}
              value={planValue}
              items={planList}
              setOpen={setPlanOpen}
              setValue={setPlanValue}
              setItems={setNetworkList}
              placeholder="Select a plan"
            />

            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Amount"
              placeholderTextColor={theme.text}
              selectionColor={Colors.primary}
            />
            <TextInput
               style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholder="Pin"
              placeholderTextColor={theme.text}
              secureTextEntry={true}
              selectionColor={Colors.primary}
            />

            <RoundedButton
              text={Strings.confirm}
              textStyle={styles.roundedTextButton}
              style={styles.roundedButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
