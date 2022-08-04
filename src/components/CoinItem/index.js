import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import stylesC from "./styles";
import { styles } from "../../styles/info";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Colors from "../../constants/colors"

const CoinItem = ({ marketCoin }) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  const [isFavourited, setisFavourited] = React.useState(false);

  const navigation = useNavigation();

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || 'white';

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
    return marketCap;
  };

  const isFavouritedIcon = isFavourited === true ? "star" : "star-outline";

  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Stats", { coinId: id })}
      >

      <Ionicons
          name={isFavouritedIcon}
          size={12}
          color={Colors.primary}
          onPress={() => setisFavourited(true)}
        />
        <Image
          source={{ uri: image }}
          style={{
            height: 30,
            width: 30,
            marginRight: 10,
            alignSelf: "center",
          }}
        />
        {/* <View> */}
        <Text style={styles.cryptoText}>{name}</Text>
        {/* <View style={{ flexDirection: "row" }}> */}
        {/* <View style={stylesC.rankContainer}> */}
        {/* <Text style={stylesC.rank}>{market_cap_rank}</Text> */}
        {/* </View> */}
        {/* <Text style={styles.text}>{symbol.toUpperCase()}</Text> */}
        <AntDesign
          name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
          size={12}
          color={percentageColor}
          style={{ alignSelf: "center", marginRight: 5 }}
        />
        <Text style={{ color: percentageColor }}>
          {price_change_percentage_24h?.toFixed(2)}%
        </Text>
        {/* </View> */}
        {/* </View> */}
        {/* <View style={{ marginLeft: "auto", alignItems: "flex-end" }}> */}
        <Text style={styles.cryptoPriceText}>{current_price}</Text>
        <Text style={styles.cryptoMarketCapText} numberOfLines={1}>
          {normalizeMarketCap(market_cap)}
        </Text>
        {/* </View> */}
      </Pressable>
    </View>
  );
};

export default CoinItem;
