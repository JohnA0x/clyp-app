import * as Strings from "../strings/strings";

export const cryptoListArray = [
  {
    id: 0,
    name: Strings.ngnToken,
    abb: Strings.ngnt,
    icon: "https://cdn-icons-png.flaticon.com/512/5922/5922004.png",
    value: "0 NGNT",
    network: ["NGNT"]
  },

  {
    id: 1,
    name: Strings.bitcoin,
    abb: Strings.btc,
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",
    value: "0 BTC",
    network: ["BTC", "BTC (Segwit)"]
  },
  {
    id: 2,
    name: Strings.ethereum,
    abb: Strings.eth,
    icon: "https://cdn-icons-png.flaticon.com/512/4125/4125334.png",
    value: "0 ETH",
    network: ["ERC-20", "BEP-20"]
  },
  {
    id: 3,
    name: Strings.binancecoin,
    abb: Strings.bnb,
    icon: "https://cdn-icons-png.flaticon.com/512/6675/6675721.png",
    value: "0 BNB",
    network: ["BEP-20", "BEP-2"]
  },
  {
    id: 4,
    name: Strings.litecoin,
    abb: Strings.ltc,
    icon: "https://cdn-icons-png.flaticon.com/512/825/825463.png",
    value: "0 LTC",
    network: ["LTC", "LTEC"]
  },
  {
    id: 5,
    name: Strings.usdtether,
    abb: Strings.usdt,
    icon: "https://cdn-icons-png.flaticon.com/512/825/825508.png",
    value: "0 USDT",
    network: ["ERC-20", "BEP-20", "TRC-20"]
  },
];

export default cryptoListArray;
