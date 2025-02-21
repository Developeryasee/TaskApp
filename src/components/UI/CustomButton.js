import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";


const CustomButton = ({
    title,
    span,
    onPress,
    disabled = false,
    loading = false,
    style = {},
    textstyle = {},
    spanstyle = {},
    children
}) => {
    const buttonStyles = [
        styles.button,
        style,
    ];
    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}
        disabled={disabled}
        >
            {
                loading ? <ActivityIndicator
                    size={"large"}
                    color={"#000000"}
                /> :
                    <>
                        {
                            title &&
                            <Text style={[styles.text, textstyle]}>{title} {span && <Text style={[styles.text, spanstyle]}>{span}</Text>}</Text>
                        }
                        {
                            children
                        }
                    </>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        fontSize: 16
    }
})
export default memo(CustomButton);