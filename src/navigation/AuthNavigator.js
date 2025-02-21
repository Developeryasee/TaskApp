import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/loginscreen";
import OnboardScreen from "../screens/onboardscreen";
import SignupScreen from "../screens/signupscreen";



export default function AuthNavigation({initialScreen}) {
    const stack = createNativeStackNavigator();
    return(
        <stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_right'}} initialRouteName={initialScreen}>
            <stack.Screen name="onboard" component={OnboardScreen}/>
            <stack.Screen name="login" component={LoginScreen}/>
            <stack.Screen name="signup" component={SignupScreen}/>

        </stack.Navigator>
    )
}