import AsyncStorage from "@react-native-async-storage/async-storage";
import { configs } from "./apiService";



const { apiInstance } = configs;


class auth {
  authToken = ''

  async setAuthToken(token) {
    this.authToken = 'Bearer ' + token
    apiInstance.setHeader('Authorization', this.authToken);
    await AsyncStorage.setItem("AuthToken", this.authToken).then((res) => {
      console.log("token set");
      
    })
      .catch(ex => {

        console.log(">>>>>>>>>>AuthToken ex", ex)
      });
  }
  login(body) {
    return new Promise((resolve, reject) => {
      apiInstance.post('auth/login', body)
        .then(res => {
          resolve(res);
        }).catch(ex => {
          reject(ex);
        })
    })
  }

  signup(body){
    return new Promise((resolve, reject) => {
      apiInstance.post('auth/signup', body)
        .then(res => {
          resolve(res);
        }).catch(ex => {
          reject(ex);
        })
    })
  }
}

export default new auth();