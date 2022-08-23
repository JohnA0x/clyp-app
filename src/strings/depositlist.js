import * as Strings from "../strings/strings";

export const depositListArray = [
  {
    id: 1,
    title: Strings.depositviaCrypto,
    subtitle: 'Deposit local currency via a supported crypto wallet address',
    icon: "logo-bitcoin",
  },
  {
    id: 2,
    title: Strings.depositviaP2P,
    subtitle: 'Deposit fiat via a P2P network',
    icon: "people",
  },
  {
    id: 3,
    title: Strings.depositviaDebit,
    subtitle: 'Deposit cash via a trusted or saved debit card',
    icon: "card",
  },
];

export const depositCardList =[
  {
    id: 0,
    cardImage: 'https://cdn-icons-png.flaticon.com/512/196/196578.png',
    cardName: 'ClypPay User',
    cardType: 'MasterCard',
    cardNumber: '5399 8304 1723 6903',
    securityCode: 168,
    expiry: "02/24"
    
  },

  {
    id: 1,
    cardName: 'ClypPay User',
    cardType: 'Visa',
    cardNumber: '4288 1402 5321 0099',
    securityCode: 235,
    expiry: "04/27"
  }
]

// export default depositListArray;
