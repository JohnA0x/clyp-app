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
    title: Strings.depositviaBank,
    subtitle: 'Deposit fiat using bank transfer',
    icon: "cash",
  },
  {
    id: 3,
    title: Strings.depositviaDebit,
    subtitle: 'Deposit cash via a trusted or saved debit card',
    icon: "card",
  },
  {
    id: 4,
    title: Strings.depositviaP2P,
    subtitle: 'Deposit fiat via a P2P network',
    icon: "people",
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
    cardImage: 'https://cdn-icons-png.flaticon.com/512/196/196578.png',
    cardName: 'ClypPay User',
    cardType: 'Visa',
    cardNumber: '4288 1402 5321 0099',
    securityCode: 235,
    expiry: "04/27"
  },
]


export const bankAccountList =[
  {
    id: 0,
    bankIcon: 'https://cdn-icons-png.flaticon.com/512/2830/2830289.png',
    bankAccountName: 'ClypPay User',
    bank: 'ClypPay',
    bankAccountNumber: '3456789010',
  },

  {
    id: 1,
    bankIcon: 'https://cdn-icons-png.flaticon.com/512/2830/2830289.png',
    bankAccountName: 'ClypPay User',
    bank: 'ClypPay',
    bankAccountNumber: '3456789010',
  },
]
// export default depositListArray;
