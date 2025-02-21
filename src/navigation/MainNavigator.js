import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/homescreen";
import CreateTaskScreen from "../screens/createtaskscreen";
import EditTaskScreen from "../screens/edittaskscreen";
import ProfileScreen from "../screens/profilescreen";


export default function MainNavigator() {
    const stack = createNativeStackNavigator();
    return(
        <stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_right'}}>
            <stack.Screen name="home" component={HomeScreen}/>
            <stack.Screen name="createTask" component={CreateTaskScreen}/>
            <stack.Screen name="editTask" component={EditTaskScreen}/>
            <stack.Screen name="profile" component={ProfileScreen}/>
        </stack.Navigator>
    )
}