import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../styles";
import LogoLarge from "../assets/icons/logolarge.svg"
import CustomTextInput from "../components/UI/CustomTextInput";
import CustomButton from "../components/UI/CustomButton";
import authService from "../services/authService";
import { useAuth } from "../navigation/AppNavigator";


export default function LoginScreen({ navigation }) {
    const { updateLogin } = useAuth();
    const { top } = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [errorEmail,setErrorEmail]=useState("");
    const [password, setPassword] = useState("");
    const [errorPassword,setErrorPassword]=useState("");
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const handleLogin = async () => {
        try {
            var atcheck = email.indexOf("@");
            var dotcheck = email.lastIndexOf(".");
            if (email.trim().length === 0 || password.trim().length === 0) {
                setErrorEmail("Enter your email address");
                setErrorPassword("Enter your password");
                setError(true);
            } 
            else if (dotcheck < atcheck + 2 || atcheck + 2 >= email.length) {
                setError(true);
                setErrorPassword("");
                setErrorEmail("Enter valid email address");
            }
            else {
                setLoad(true);
                setErrorEmail("");
                setErrorPassword("");
                setError(false);
                let body = {
                    "email": email,
                    "password": password
                }

                let responce = await authService.login(body);
                
                if (responce.status === 200) {
                    if (responce.data?.message === "Login successful") {
                        console.log(responce.data?.token);
                        
                        await authService.setAuthToken(responce.data?.token);
                        setLoad(false);
                        updateLogin(true);
                    }
                }else{
                    setLoad(false);
                    Alert.alert("Error",responce.data?.message);
                }
            }


        } catch (error) {
            setLoad(false);
            console.log(error);
        }
    }

    const moveToSignup = () => {
        navigation.navigate('signup');
    }
    return (
        <View style={[globalStyles.container, { paddingTop: top ? top : 20 }]}>
            <LogoLarge style={{ alignSelf: 'center' }} />

            <Text style={styles.welcomeText}>Welcome Back!</Text>

            <CustomTextInput
                label="Email Address"
                style={styles.inputStyle}
                placeholder={"Enter your email address"}
                onChangeText={(txt) => {
                    setEmail(txt);
                }}
                error={error ?(email.trim().length===0||errorEmail.length!=0)&& errorEmail : null}
            />

            <CustomTextInput
                label="Password"
                style={[styles.inputStyle, { marginTop: 27 }]}
                placeholder={"Enter your password"}
                secureTextEntry={true}
                onChangeText={(txt) => {
                    setPassword(txt);
                }}
                error={error ?(password.trim().length===0||errorPassword.length!=0)&&errorPassword : null}
            />

            <CustomButton
                loading={load}
                disabled={load}
                title={"Log In"}
                style={styles.loginButton}
                textstyle={styles.buttonText}
                onPress={handleLogin}
            />

            <CustomButton
                title={"Don’t have an account?"}
                span={"Sign Up"}
                spanstyle={{
                    color: '#FED36A',
                }}
                textstyle={{
                    color: '#8CAAB9',
                    fontFamily: 'Poppins-Regular',
                }}
                style={styles.needSignUp}
                onPress={moveToSignup}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 26,
        fontFamily: 'Poppins-Regular',
        fontWeight: "500",
        marginTop: 49,
        color: '#fff'
    },
    inputStyle: {
        marginTop: 23,
        marginBottom: 0,
    },
    loginButton: {
        width: '100%',
        height: 67,
        marginTop: 68,
        backgroundColor: '#FED36A'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#000000'
    },
    needSignUp: {
        marginTop: 25,
    }
})