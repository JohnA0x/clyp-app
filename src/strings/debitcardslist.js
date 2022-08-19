import * as Strings from "./strings";
import * as Colors from "../constants/colors";

export const debitCardListArray = [
  {
    id: 0,
    name: 'Gabriel Awosusi',
    bank: 'GTBANK',
    cardColour: Colors.black,
    cardType: 'MasterCard',
    cardIcon: "logo-bitcoin",
    cardNumber: "5399   8715   1254   0982",
    cvv: '433',
    validity: '07/24',
    selectedColor: Colors.grey,
    unselectedColor: Colors.grey,
    
  },
  {
    id: 1,
    name: 'Gabriel Awosusi',
    bank: 'GTBANK',
    cardColour: Colors.primary,
    cardType: 'Visa',
    cardIcon: "people",
    cardNumber: "4237   8765   4424   5911",
    cvv: '433',
    validity: '07/24',
    selectedColor: Colors.grey,
    unSelectedColor: Colors.grey,
  },
];

export default debitCardListArray
