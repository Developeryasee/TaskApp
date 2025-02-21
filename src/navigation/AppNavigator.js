import React, { createContext, useContext, useEffect, useState } from "react";
import AuthNavigation from "./AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { configs } from "../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigator from "./MainNavigator";
import { ActivityIndicator, View } from "react-native";
import { globalStyles } from "../styles";

const LoginContext = createContext();
export const useAuth = () => useContext(LoginContext);

export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [load, setLoad] = useState(true);
    const [isOnboard,setIsOnboard] = useState(false);
    const getToken = async () => {
        let userToken = null;
        userToken = await AsyncStorage.getItem('AuthToken');
        
        configs.apiInstance.setHeader('Authorization', userToken);
        setIsLoggedIn(!!userToken);
    }

    const checkOnboard = async () =>{
        let onboard = await AsyncStorage.getItem('isOnboard');
        if (onboard==="Already did") {
            setIsOnboard(true);
        }else{
            setIsOnboard(false);
        }
        setLoad(false);
    }

    const updateLogin = (flag) => {
        if (flag===false) {
        AsyncStorage.removeItem('AuthToken');
        setIsOnboard(true);
        }
        setIsLoggedIn(flag);
    }
    useEffect(() => {
        setTimeout(() => {
            getToken();
            checkOnboard();
        }, 500);
    }, []);



    return (
        <LoginContext.Provider value={{ updateLogin }}>
            {
                load ?
                    <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <ActivityIndicator
                            size={"large"}
                            color={"#fff"}
                        />
                    </View> :
                    <NavigationContainer>
                        {
                            isLoggedIn ? <MainNavigator /> : <AuthNavigation initialScreen={isOnboard?'login':'onboard'}/>
                        }

                    </NavigationContainer>
            }

        </LoginContext.Provider>

    )
}