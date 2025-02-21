import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../components/UI/CustomHeader";
import Avatar from "../assets/icons/avatar.svg"
import Logout from "../assets/icons/logout.svg"
import { useAuth } from "../navigation/AppNavigator";
import CustomTextInput from "../components/UI/CustomTextInput";
import { useSelector } from "react-redux";
import CustomButton from "../components/UI/CustomButton";
export default function ProfileScreen({ navigation }) {
    const { top,bottom } = useSafeAreaInsets();
    const { updateLogin } = useAuth();
    const { userdata } = useSelector(state => state.task);

    const LogoutUser=()=>{
        updateLogin(false);
    }
    return (
        <View style={[globalStyles.container, { paddingTop: top ? top : 20, alignItems: 'center' }]}>
            <CustomHeader navigation={navigation} title={"Profile"} />

            <View style={styles.avatar}>
                <Avatar width={"100%"} height={"100%"}/>
            </View>
            
            <CustomTextInput style={{width:"100%",marginBottom:0}} value={userdata?.username} editable={false}/>
            <CustomTextInput style={{width:"100%",marginTop:26,marginBottom:0}} value={userdata?.email} editable={false}/>
            

            <CustomButton style={[styles.button,{bottom:bottom===0?20:bottom}]} onPress={LogoutUser}>
                    <Logout/>
                    <Text style={styles.buttonText}>Logout</Text>
            </CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 127, 
        height: 127, 
        borderRadius: 127, 
        backgroundColor: '#212832', 
        borderWidth:3,
        borderColor:'#FED36A',
        marginTop: 53,
        marginBottom:53,
        padding:3
    },
    button:{
        width:'100%',
        backgroundColor:'#FED36A',
        height:54,
        position:'absolute',
    },
    buttonText:{
        fontSize:18,
        fontFamily:"Poppins-Regular",
        color:'#000',
        marginLeft:10
    }
})