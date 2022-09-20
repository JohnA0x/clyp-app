import { StyleSheet } from "react-native";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Colors.backgroundColor,
  },

  header: {
    color: Colors.textColor,
    marginTop: 20,
  },

  headerText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  // Deposit Cash
  addCash: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    marginStart: 30,
    marginTop: 20,
  },

  addCashDescription: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    marginStart: 30,
    marginTop: 5,
  },

  amountValueText: {
    width: "50%",
    fontSize: 40,
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
    marginTop: '50%',
    alignSelf: "center",
    textAlign: 'center',
  },

  roundedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    width: "85%",
    height: 50,
    marginTop: '30%',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center'
  },

  roundedTextButton: {
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
  },

  // Payment Option
  rowContainer:{
    flex: 1,
    padding: 5,
  },

  button: {
    padding: 2,
    paddingLeft: 10,
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: "95%",
    height: 70,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignSelf: "center",
  },

  paymentDescription: {
    marginTop: '10%',
    marginLeft: 20,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  flatlist: {
    display: "flex",
    paddingVertical: 10,
  },

  otherOptionsView:{
    flexDirection: 'row', 
    alignSelf: 'center',
    marginBottom: '50%'
  },

  addNewAccount: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold'
  },

  useAnotherAccount:{
    color: Colors.primary,
    marginLeft: '20%',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold'
  },

  // Offers 

  selectMerchantText:{
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    top: 20,
    start: 25,
  },

  offerFlatlist:{
    display: "flex",
    marginVertical: 20,
    paddingVertical: 10,
  },

  offerRow:{
    flexDirection: "row",
  },

  offerColumn:{
    flexDirection: "column",
  },

  icon:{
    width: 15,
    height: 15,
  },

  merchantBox:{
    borderRadius: 20,
    padding: 20,
    marginStart: 20,
    marginEnd: 20,
  },

  merchantName:{
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    marginStart: 10,
  },

  tradeRate:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    marginStart: "40%",
  },

  offerAmount:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginTop: 10,
  },

  amountReceivedText:{
    fontFamily: 'Poppins_500Medium',
    marginTop: 10,
    fontSize: 8,
  },

  paymentMethodText:{
    fontFamily: 'Poppins_500Medium',
    marginTop: 10,
    fontSize: 8,
  },

  offerFee:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 8,
    textAlign: 'right',
    marginTop: 12,
    marginStart: 20,
  },

  amountReceivedValue:{
    fontFamily: 'Poppins_500Medium',
    marginTop: 10,
    fontSize: 12,
    textAlign: 'right',
    marginStart: 20,
  },

  paymentMethodValue:{
    fontFamily: 'Poppins_500Medium',
    marginTop: 10,
    fontSize: 8,
    textAlign: 'right',
    marginStart: 20,
  },

  actionButton:{
    borderRadius: 20,
    width: 60,
    height: 30,
    backgroundColor: Colors.addGoal,
    justifyContent: 'center',
    marginStart: 50,
    marginTop: '10%'
  },

  actionButtonText:{
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },


  // Finalise Offer
  cancelOrder:{
    backgroundColor: Colors.failedColor,
    borderRadius: 40,
    width: "30%",
    height: 30,
    marginTop: 17,
    marginStart: '65%',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    alignSelf: "right",
    justifyContent: 'center'
  },

  sendMoneyText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    marginStart: 20,
    marginTop: 20,
  },

  makePaymentText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    marginStart: 20,
    marginTop: 20,
  },

  youSendText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    marginTop: 20,
    textAlign: 'center',
  },

  finaliseAmountValue:{
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
    marginTop: 2,
    textAlign: 'center',
  },

  chargesText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    marginTop: 1,
    textAlign: 'center',
  },

  bankDetails:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginStart: 20,
    marginTop: 20,
  },

  merchantContact:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginStart: 20,
    marginTop: 20,
  },

  terms:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginStart: 20,
    marginTop: 20,
  },

  termsDetail:{
    textAlign: "left",
    width: '70%',
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    marginStart: 20,
  },



});
