import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import filter from "lodash.filter";
import { ImageButton, VectorButton } from "../components/button";
import { styles } from "../styles/receivecrypto";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { cryptoListArray } from "../strings/cryptolist";

export default function ReceiveCryptoScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const receiveCryptoList = ({ item }) => (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.list}
        //  onPress={() => navigation.push(item.name)}
      >
        <Image source={{ uri: item.icon }} style={styles.image} />
        <Text style={styles.valueText}>{item.value}</Text>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(cryptoListArray, (crypto) => {
      return contains(crypto, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };
  
  const contains = ({ name}, query) => {
  
    if (name.includes(query)) {
      return true;
    }
  
    return false;
  };


  return (
    <SafeAreaView>
      <View style={styles.header}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={styles.headerText}>{Strings.receiveCrypto}</Text>
      </View>

      <View style={styles.flatlist}>
        <FlatList
          data={cryptoListArray}
          //ListHeaderComponent={renderHeader}
          renderItem={receiveCryptoList}
        />
      </View>
    </SafeAreaView>
  );
}

