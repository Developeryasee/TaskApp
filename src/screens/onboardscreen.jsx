import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Logo from "../assets/icons/logo.svg";
import Pana from "../assets/icons/pana.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "../components/UI/CustomButton";
import { globalStyles } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardScreen({ navigation }) {
    const { top } = useSafeAreaInsets();

    const onPress = async () => {
        await AsyncStorage.setItem("isOnboard", 'Already did').then((res) => {
            navigation.navigate('login');

        })
            .catch(ex => {

                console.log(">>>>>>>>>>AuthToken ex", ex)
            });
    }
    return (
        <View style={[globalStyles.container, { paddingTop: top ? top : 20 }]}>
            <Logo />

            <View style={styles.avatar}>
                <Pana height={270} />
            </View>

            <View style={{ paddingTop: 40 }}>
                <Text style={styles.logotext}>{`Manage ${"\n"}Your${"\n"}Task With${"\n"}`}<Text style={{ color: "#FED36A" }}>DayTask</Text></Text>

                <CustomButton
                    title={"Let’s Start"}
                    style={styles.startbutton}
                    textstyle={styles.buttonText}
                    onPress={onPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: '100%',
        height: 280,
        marginTop: 37,
        backgroundColor: '#fff'
    },
    logotext: {
        fontSize: 40,
        color: '#fff',
        fontFamily: 'PilatExtended-DemiBold'
    },
    startbutton: {
        width: '100%',
        height: 67,
        marginTop: 44,
        backgroundColor: '#FED36A'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#000000'
    }
})