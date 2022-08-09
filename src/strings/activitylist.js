import * as Strings from "../strings/strings";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const activityListArray = [
  {
    id: 1,
    title: 'Crypto Sale',
    description: 'You sold 2.88 BNB',
    icon: "arrow-up",
    time: '10:54 am',
    date: '5th August 2022',
    status: 'Pending',
  },

  {
    id: 2,
    title: 'Crypto Withdrawal',
    description: '50 BNB has been deposited into your wallet',
    icon: "arrow-down",
    time: '4:27 pm',
    date: '4th August 2022',
    status: 'Successful',
  },

  {
    id: 3,
    title: 'Crypto Swap',
    description: 'You attempt to swap 2.8 ETH',
    icon: "swap-horizontal",
    time: '12:02 pm',
    date: '2nd August 2022',
    status: 'Failed',
  },
];

export default activityListArray;
