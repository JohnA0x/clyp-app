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

export default function EditProfileScreen({ navigation, route }) {
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
          handlePress={() => navigation.navigate(Strings.home, {
            id: route.params.id,
            preferences: route.params.preferences,
            firstName: route.params.firstName,
            lastName: route.params.lastName,
            user: route.params.user
          })}
        />

        <ImageButton
          image={route.params.user.picture ? route.params.user.picture : image}
          style={styles.profileImage}
          imageStyle={styles.profileImage}
          handlePress={pickImage}
        />

        <Text style={styles.profileName}>{route.params.user.first_name} {route.params.user.last_name}</Text>

        <FlatList
          contentContainerStyle={styles.flatlist}
          data={editprofileListArray}
          renderItem={editOptions}
        />
      </SafeAreaView>
    );
  }

  function UserNameEdit() {
    const [first_name, setFName] = useState(route.params.user.first_name ? route.params.user.first_name : "" );
    const [last_name, setLName] = useState(route.params.user.last_name ? route.params.user.last_name : "");
    const [middle_name, seMFName] = useState(route.params.user.middle_name ? route.params.user.middle_name : "" );

    const submit = () => {

      let data = {
        first_name,
        last_name,
        middle_name,
        user_id: route.params.user.id
      }
      axios.post('/user-gateway/update', data)
      .then(user_data => {

      })
      .catch(err => {
        
      })

    }

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
          value={first_name}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Middle Name"
          selectionColor={Colors.primary}
          value={middle_name ? middle_name : ""}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Last Name"
          selectionColor={Colors.primary}
          value={last_name}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          onPress={() => submit()}
        />
      </SafeAreaView>
    );
  }

  function AddressEdit() {
      const [state, setState] = useState(route.params.user.state ? route.params.user.state : "");
      const [city, setCity] = useState(route.params.user.city ? route.params.user.city : "");
      const [house, setHouse] = useState(route.params.user.house ? route.params.user.house : "");

      const submit = () => {

        let data = {
          state,
          city,
          house,
          user_id: route.params.user.id
        }
        axios.post('/user-gateway/update', data)
        .then(user_data => {
  
        })
        .catch(err => {
          
        })
  
      }

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
          value={state}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="City"
          selectionColor={Colors.primary}
          value={city}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="House Number and Street Name"
          selectionColor={Colors.primary}
          value={house}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          onPress={() => submit()}
        />
      </SafeAreaView>
    );
  }

  function ContactEdit() {
    
    const [phone, setPhone] = useState(route.params.user.email ? route.params.user.email: "" );
    const [email, setEmail] = useState(route.params.user.phone ? route.params.user.phone : "" );

    const submit = () => {

      let data = {
        phone,
        email,
        user_id: route.params.user.id
      }
      axios.post('/user-gateway/update', data)
      .then(user_data => {

      })
      .catch(err => {
        
      })

    }

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
          value={email}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Email"
          selectionColor={Colors.primary}
          value={phone}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          onPress={() => submit()}
        />
      </SafeAreaView>
    );
  }

  function IdentifictaionEdit() {

    const [bvn, setBVN] = useState(route.params.user.bvn ? route.params.user.bvn : "");
    const [nin, setNIN] = useState(route.params.user.nin ? route.params.user.nin : "");

    const submit = () => {

      let data = {
        bvn,
        nin,
        user_id: route.params.user.id
      }
      axios.post('/user-gateway/update', data)
      .then(user_data => {

      })
      .catch(err => {
        
      })

    }

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
          value={bvn}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="NIN Number"
          selectionColor={Colors.primary}
          value={nin}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          onPress={() => submit()}
        />
      </SafeAreaView>
    );
  }
}
