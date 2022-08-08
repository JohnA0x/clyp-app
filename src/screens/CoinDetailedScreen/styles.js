import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import * as Colors from "../../constants/colors";

const styles = StyleSheet.create({
  currentPrice: {
    color: "black",
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textColor,
    letterSpacing: 1,
  },
  name: {
    color: "black",
    color: Colors.textColor,
    fontSize: 15,
  },
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceChange: {
    color: "black",
    fontSize: 17,
    fontWeight: "500",
  },

  currencytext:{
    color: "black", 
    alignSelf: "center",
    marginTop: 30,
    fontFamily: 'Poppins_600SemiBold',
  },

  input: {
    flex: 1,
    height: 40,
    margin: 12,
    marginTop: 40,
    backgroundColor: Colors.listHolder,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "black",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2B2B2B",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20
  },
  candleStickText: {
    color: "black",
    fontWeight: "700",
  },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  candleStickTextLabel: {
    color: 'grey',
    fontSize: 13
  }
});

export default styles;
