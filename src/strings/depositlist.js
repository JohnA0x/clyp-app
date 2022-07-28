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

export default depositListArray;
