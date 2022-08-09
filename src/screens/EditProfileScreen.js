import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/editprofile";
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Colors from "../constants/colors";
import axios from "../components/axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import editprofileListArray from "../strings/editprofilelist";
import * as Strings from "../strings/strings";
import * as ImagePicker from "expo-image-picker";

const Stack = createNativeStackNavigator();

export default function EditProfileScreen({ navigation }) {
  //const img =
    
  const [image, setImage] = useState("https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="editprofile" component={EditProfile} />
      <Stack.Screen name={Strings.username} component={UserNameEdit} />
      <Stack.Screen name={Strings.useraddress} component={AddressEdit} />
      <Stack.Screen name={Strings.contact} component={ContactEdit} />
      <Stack.Screen name={Strings.iddocument} component={IdentifictaionEdit} />
    </Stack.Navigator>
  );

  function EditProfile() {
    const editOptions = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.name)}
          >
            <VectorButton
              name={item.icon}
              size={24}
              color={Colors.primary}
              style={styles.flatlistImage}
              handlePress={() => navigation.navigate(item.name)}
            />
            <Text style={styles.flatlistText}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.push(Strings.home)}
        />
        <ImageButton
          image={image}
          style={styles.profileImage}
          imageStyle={styles.profileImage}
          handlePress={pickImage}
        />
        <Text style={styles.profileName}>John Alalade</Text>

        <FlatList
          contentContainerStyle={styles.flatlist}
          data={editprofileListArray}
          renderItem={editOptions}
        />
      </SafeAreaView>
    );
  }

  function UserNameEdit() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("editprofile")}
          />
          <Text style={styles.headerText}>{Strings.username}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="First Name"
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Middle Name"
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Last Name"
          selectionColor={Colors.primary}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
        />
      </SafeAreaView>
    );
  }

  function AddressEdit() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("editprofile")}
          />
          <Text style={styles.headerText}>{Strings.useraddress}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="State"
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="City"
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="House Number and Street Name"
          selectionColor={Colors.primary}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
        />
      </SafeAreaView>
    );
  }

  function ContactEdit() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("editprofile")}
          />
          <Text style={styles.headerText}>{Strings.contact}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Phone Number"
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Email"
          selectionColor={Colors.primary}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
        />
      </SafeAreaView>
    );
  }

  function IdentifictaionEdit() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("editprofile")}
          />
          <Text style={styles.headerText}>{Strings.iddocument}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="BVN Number"
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="NIN Number"
          selectionColor={Colors.primary}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
        />
      </SafeAreaView>
    );
  }
}
