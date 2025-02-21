import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ArrowLeft from "../../assets/icons/arrowleft.svg";
import Avatar from "../../assets/icons/avatar.svg";
import CustomButton from "./CustomButton";

function CustomHeader({ screen, navigation,title }) {
    const goBack = () => {
        navigation.goBack();
    }
    const moveToProfile=()=>{
        navigation.navigate('profile');
    }
    return (
        <View style={styles.container}>
            {
                screen === "home" ? <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ flex: 1, alignSelf: "flex-start" }}>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#FED36A' }}>Welcome Back!</Text>
                        <Text style={{ fontFamily: 'PilatExtended-DemiBold', color: '#fff', fontSize: 23 }} numberOfLines={1}>{title}</Text>
                    </View>
                    <CustomButton onPress={moveToProfile}>
                    <Avatar />
                    </CustomButton>
                </View> :
                    <>
                        <CustomButton
                            onPress={goBack}>
                            <ArrowLeft />
                        </CustomButton>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 24 }}>
                            <Text style={styles.headerTitle}>{title}</Text>

                        </View>
                    </>
            }


        </View>
    )
}
export default memo(CustomHeader);
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#FFFFFF',
    }
})