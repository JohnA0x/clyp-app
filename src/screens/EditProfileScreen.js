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
import { CustomAlert } from "../components/alert";
import { ProcessingModal } from "../components/modal";
import { theme } from "native-base";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function EditProfileScreen({ navigation, route }) {
  //const img =

  const [image, setImage] = useState(route.params.user.picture ? route.params.user.picture : "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
  );


  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

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
    const [isVisible, setIsVisisble] = useState(false)

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
        setIsVisisble(true)
        let formdata = new FormData()
  
        formdata.append("file", {
          uri: result.uri,
          name: `${route.params.user.first_name}_clyp_image${result.uri.slice(result.uri.lastIndexOf('.'))}`,
          type: `${result.type}/${result.uri.slice(result.uri.lastIndexOf('.') - 1)}`,
          height: result.height,
          width: result.width
        })
  
        formdata.append("filename", `${route.params.user.first_name}_clyp_image${result.uri.slice(result.uri.lastIndexOf('.'))}`)
  
        formdata.append("user_id", route.params.user.id)
  
        axios.post('/user-gateway/update-user', formdata, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(user_data => {
            setIsVisisble(false)
            if (user_data.data.message == "success") {
              setImage(result.uri);
              route.params.user.picture = result.uri
              navigation.navigate("editprofile")
            }
            else {
              CustomAlert({
                title: "Update failed",
                subtitle: "Please try again...",
                handlePress: () => { },
              });
            }
          })
          .catch(err => {
            setIsVisisble(false)
            CustomAlert({
              title: "Error",
              subtitle: err,
              handlePress: () => { },
            });
          })
  
      }
    };

    const editOptions = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.flatlist}]}
            onPress={() => navigation.navigate(item.name)}
          >
            <VectorButton
              name={item.icon}
              size={24}
              color={Colors.primary}
              style={styles.flatlistImage}
              handlePress={() => navigation.navigate(item.name)}
            />
            <Text style={[styles.flatlistText, {color: theme.text}]}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>

        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.Profile, {
            id: route.params.id,
            preferences: route.params.preferences,
            firstName: route.params.firstName,
            lastName: route.params.lastName,
            user: route.params.user
          })}
        />

        <ImageButton
          image={image}
          style={styles.profileImage}
          imageStyle={styles.profileImage}
          handlePress={pickImage}
        />

        <Text style={[styles.profileName, {color: theme.text}]}>{route.params.user.first_name} {route.params.user.last_name}</Text>

        <FlatList
          contentContainerStyle={styles.flatlist}
          data={editprofileListArray}
          renderItem={editOptions}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function UserNameEdit() {
    const [first_name, setFName] = useState(route.params.user.first_name ? route.params.user.first_name : "");
    const [last_name, setLName] = useState(route.params.user.last_name ? route.params.user.last_name : "");
    const [middle_name, setMName] = useState(route.params.user.middle_name ? route.params.user.middle_name : "");
    const [isVisible, setIsVisible] = useState(false)

    const submit = () => {
      setIsVisible(true)
      let data = {
        first_name,
        last_name,
        // middle_name,
        user_id: route.params.user.id
      }
      axios.post('/user-gateway/update-user', data)
        .then(user_data => {
          setIsVisible(false)
          if (user_data.data.message == "success") {
            route.params.user.first_name = data.first_name
            route.params.user.last_name = data.last_name
            navigation.navigate("editprofile")
          }
          else {
            CustomAlert({
              title: "Update failed",
              subtitle: "Please try again...",
              handlePress: () => { },
            });
          }
        })
        .catch(err => {
          setIsVisible(false)
          CustomAlert({
            title: "Error",
            subtitle: err,
            handlePress: () => { },
          });
        })

    }

    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("editprofile")}
          />
          <Text style={[styles.headerText, {color: theme.text}]}>{Strings.username}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="First Name"
          selectionColor={Colors.primary}
          value={first_name}
          onChangeText={(value) => setFName(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Middle Name"
          selectionColor={Colors.primary}
          value={middle_name ? middle_name : ""}
          onChangeText={(value) => setMName(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Last Name"
          selectionColor={Colors.primary}
          value={last_name}
          onChangeText={(value) => setLName(value)}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submit()}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function AddressEdit() {
    const [state, setState] = useState(route.params.user.state ? route.params.user.state : "");
    const [city, setCity] = useState(route.params.user.city ? route.params.user.city : "");
    const [house, setHouse] = useState(route.params.user.address ? route.params.user.address : "");
    const [isVisible, setIsVisible] = useState(false)

    const submit = () => {
      setIsVisible(true)
      let data = {
        state,
        city,
        house,
        user_id: route.params.user.id
      }
      axios.post('/user-gateway/update-user', data)
        .then(user_data => {
          setIsVisible(false)
          if (user_data.data.message == "success") {

            route.params.user.state = data.state
            route.params.user.city = data.city
            route.params.user.address = data.house

            navigation.navigate("editprofile")
          }
          else {
            CustomAlert({
              title: "Update failed",
              subtitle: "Please try again...",
              handlePress: () => { },
            });
          }
        })
        .catch(err => {
          setIsVisible(false)
          CustomAlert({
            title: "Error",
            subtitle: err,
            handlePress: () => { },
          });
        })


    }

    return (
      <SafeAreaView style ={[styles.container, {backgroundColor: theme.background}]}>
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
          onChangeText={(value) => setState(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="City"
          selectionColor={Colors.primary}
          value={city}
          onChangeText={(value) => setCity(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="House Number and Street Name"
          selectionColor={Colors.primary}
          value={house}
          onChangeText={(value) => setHouse(value)}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submit()}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function ContactEdit() {

    const [phone, setPhone] = useState(route.params.user.email ? route.params.user.email : "");
    const [email, setEmail] = useState(route.params.user.phone ? route.params.user.phone : "");
    const [isVisible, setIsVisible] = useState(false)

    const submit = () => {
      setIsVisible(true)
      let data = {
        phone,
        email,
        user_id: route.params.user.id
      }
      axios.post('/user-gateway/update-user', data)
        .then(user_data => {
          setIsVisible(false)
          if (user_data.data.message == "success") {

            route.params.user.email = data.email
            route.params.user.phone = data.phone

            navigation.navigate("editprofile")
          }
          else {
            setIsVisible(false)
            CustomAlert({
              title: "Update failed",
              subtitle: "Please try again...",
              handlePress: () => { },
            });
          }
        })
        .catch(err => {
          CustomAlert({
            title: "Error",
            subtitle: err,
            handlePress: () => { },
          });
        })


    }

    return (
      <SafeAreaView style = {[styles.container, {backgroundColor: theme.background}]}>
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
          onChangeText={(value) => setPhone(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Email"
          selectionColor={Colors.primary}
          value={phone}
          onChangeText={(value) => setEmail(value)}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submit()}
        />

        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function IdentifictaionEdit() {

    const [bvn, setBVN] = useState(route.params.user.bvn ? route.params.user.bvn : "");
    const [nin, setNIN] = useState(route.params.user.nin ? route.params.user.nin : "");
    const [isVisible, setIsVisible] = useState(false)

    const submit = () => {
      setIsVisible(true)
      let data = {
        bvn,
        nin,
        user_id: route.params.user.id
      }

      axios.post('/user-gateway/update-user', data)
        .then(user_data => {
          setIsVisible(false)
          if (user_data.data.message == "success") {

            route.params.user.bvn = data.bvn
            route.params.user.nin = data.nin

            navigation.navigate("editprofile")
          }
          else {
            CustomAlert({
              title: "Update failed",
              subtitle: "Please try again...",
              handlePress: () => { },
            });
          }
        })
        .catch(err => {
          setIsVisible(false)
          CustomAlert({
            title: "Error",
            subtitle: err,
            handlePress: () => { },
          });
        })


    }

    return (
      <SafeAreaView style ={[styles.container, {backgroundColor: theme.background}]}>
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
          onChangeText={(value) => setBVN(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="NIN Number"
          selectionColor={Colors.primary}
          value={nin}
          onChangeText={(value) => setNIN(value)}
        />

        <RoundedButton
          text="Save"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submit()}
        />
        <ProcessingModal isVisible={isVisible} />

      </SafeAreaView>
    );
  }
}
