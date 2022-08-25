import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// axios.defaults.baseURL = 'https://clyp-heroku.herokuapp.com/'
// axios.defaults.baseURL = 'http://127.0.1.1/5000'

// let getToken = async () => await AsyncStorage.getItem('token').then(value => {
//     // console.log("value: "+value)
//     return axios.defaults.headers.common['Authorization'] = `Bearer ${value}` 
// });

// getToken()

// axios.interceptors.request.use(
//     async (config) => {
//     //   if (!config.headers.Authorization) {
//         const token = await AsyncStorage.getItem("token").then(value => value)
//         console.log("ttt: " + token)
//         // if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         // }
//     //   }

//       return config;
//     },
//     // error => Promise.reject(error)
//   );

// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

const instance = axios.create({
    baseURL: 'https://clyp-fiat.herokuapp.com/'
});

instance.interceptors.request.use(
        async (config) => {
        //   if (!config.headers.Authorization) {
            const token = await AsyncStorage.getItem("token").then(value => value)
            // console.log("ttt: " + token)
            // console.log(config)
            // if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            // }
        //   }
    
          return config;
        },
        error => Promise.reject(error)
      );

export default instance;