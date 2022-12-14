import { 
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync 
 } from 'expo-local-authentication';

 const biometricsAuth = async (message) => {
     const compatible = await hasHardwareAsync()
     if (!compatible) throw 'This device is not compatible for biometric authentication' 
     message = 'This device is not compatible for biometric authentication' 

     const enrolled = await isEnrolledAsync()
     if (!enrolled) throw "This device doesn't have biometric authentication enabled"
     message = "This device doesn't have biometric authentication enabled"
     
     const result = await authenticateAsync()
     if (!result.success) throw `${result.error} - Authentication unsuccessful`
     message = "Authentication unsuccessful"
     return
 }
 export default biometricsAuth