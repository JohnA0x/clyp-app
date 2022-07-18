import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from '../styles/home'
import * as Colors from '../constants/colors'
import * as Strings from '../strings/strings'
import { ImageButton, RoundedButton, VectorButton, FlatListButton } from '../components/button';
import Swiper from 'react-native-swiper';
import ProfileScreen from '../screens/ProfileScreen'
import SignupScreen from '../screens/SignupScreen'

//import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* export default function Home(){

    return(
        HomeScreen()
        
      )
} */

export default function HomeScreen ({ navigation }){
    return(
        <SafeAreaView style = {styles.container}>

            <View style = {styles.topBar}>
                <ImageButton 
                style={styles.profileImage}
                imageStyle={styles.profileImage}
                image = 'https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg'
                handlePress={()=>{navigation.push('Profile');
                 navigation.setOptions({tabBarVisible: true})}}/>
                <Text style = {styles.nameText}>Welcome Ben</Text>
                <VectorButton style={styles.notificationButton} name ='notifications-outline' size = {24} color = {Colors.primary}/>
                <VectorButton style={styles.scanButton} name ='scan' size = {24} color = {Colors.primary}/>
            </View>

            <Swiper activeDotColor={Colors.primary}>
            <View style = {styles.cryptoContainer}>
                <Text style ={styles.balanceText}>{Strings.cryptoBalance}</Text>
                <Text style = {styles.cryptoBalanceText}>0.0001 BTC</Text>

                <View style={styles.transactionOptions}>
                    <RoundedButton style={styles.sendbutton} text = {Strings.send} textStyle = {styles.textButton}/>
                    <RoundedButton style={styles.receivebutton} text = {Strings.receive} textStyle = {styles.textButton} />
                </View>
            </View>

            <View style = {styles.fiatContainer}>
                <Text style ={styles.balanceText}>{Strings.fiatBalance}</Text>
                <Text style = {styles.cryptoBalanceText}>N 35,000</Text>

                <View style={styles.transactionOptions}>
                    <RoundedButton style={styles.sendbutton} text = {Strings.deposit} textStyle = {styles.textButton}/>
                    <RoundedButton style={styles.receivebutton} text = {Strings.withdraw} textStyle = {styles.textButton} />
                </View>
            </View>

            </Swiper>
        

            <View style ={styles.coinContainer}>
                <Text style = {styles.coinText}>{Strings.coins}</Text>
                <FlatListButton/>
            </View>
            
        </SafeAreaView>
    )
}

//export default HomeScreen

