import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoLarge from "../assets/icons/logolarge.svg"
import CustomTextInput from "../components/UI/CustomTextInput";
import CustomButton from "../components/UI/CustomButton";
import authService from "../services/authService";
import { useAuth } from "../navigation/AppNavigator";


export default function SignupScreen({ navigation }) {
    const { updateLogin } = useAuth();

    const { top } = useSafeAreaInsets();
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    const handleSingup = async () => {
        try {
            var atcheck = email.indexOf("@");
            var dotcheck = email.lastIndexOf(".");
            if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
                setErrorName("Enter your Full name");
                setErrorEmail("Enter your email address");
                setErrorPassword("Enter your password");
                setError(true);
            } else {
                setLoad(true);
                setError(false);
                let body = {
                    "username":name,
                    "email": email.toLowerCase(),
                    "password": password
                }

                let responce = await authService.signup(body);

                if (responce.status === 200) {
                    if (responce.data?.message === "User registered successfully") {
                        await authService.setAuthToken(responce.data?.token);
                        setLoad(false);
                        updateLogin(true);
                    }
                } else {
                    setLoad(false);
                    Alert.alert("Error", responce.data?.message);
                }
            }


        } catch (error) {
            setLoad(false);
            console.log(error);
        }
    }

    const moveTologin = () => {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={[globalStyles.container, { paddingTop: top ? top : 20 }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20}}>
                <LogoLarge style={{ alignSelf: 'center' }} />

                <Text style={styles.welcomeText}>Create your account</Text>
                <CustomTextInput
                    label="Full name"
                    style={styles.inputStyle}
                    placeholder={"Enter your Full name"}
                    onChangeText={(txt) => {
                        setName(txt);
                    }}
                    error={error ? (name.trim().length === 0 || errorName.length != 0) && errorName : null}

                />

                <CustomTextInput
                    label="Email Address"
                    style={styles.inputStyle}
                    placeholder={"Enter your email address"}
                    onChangeText={(txt) => {
                        setEmail(txt);
                    }}
                    error={error ? (email.trim().length === 0 || errorEmail.length != 0) && errorEmail : null}

                />

                <CustomTextInput
                    label="Password"
                    style={[styles.inputStyle, { marginTop: 27 }]}
                    placeholder={"Enter your password"}
                    secureTextEntry={true}
                    onChangeText={(txt) => {
                        setPassword(txt);
                    }}
                    error={error ? (password.trim().length === 0 || errorPassword.length != 0) && errorPassword : null}

                />

                <CustomButton
                    loading={load}
                    disabled={load}
                    title={"Sign Up"}
                    style={styles.loginButton}
                    textstyle={styles.buttonText}
                    onPress={handleSingup}
                />

                <CustomButton
                    title={"Already have an account?"}
                    span={"Sign Up"}
                    spanstyle={{
                        color: '#FED36A',
                    }}
                    textstyle={{
                        color: '#8CAAB9',
                        fontFamily: 'Poppins-Regular',
                    }}
                    style={styles.alreadyAccount}
                    onPress={moveTologin}
                />
            </ScrollView>
        </KeyboardAvoidingView>
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
    alreadyAccount: {
        marginTop: 25,
    }
})