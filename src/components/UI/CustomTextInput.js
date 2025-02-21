import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function CustomTextInput({
    placeholder,
    value,
    onChangeText,
    label = '',
    keyboardType = 'default',
    secureTextEntry = false,
    error,
    style,
    inputstyle,
    multiline = false,
    editable=true,
}) {
    return (
        <View style={[styles.container, style]}>
            {
                label && <Text style={styles.labelstyle}>{label}</Text>
            }

            <TextInput
                editable={editable}
                multiline={multiline}
                style={[styles.input, inputstyle]}
                placeholder={placeholder}
                placeholderTextColor="#6F8793"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    labelstyle: {
        fontFamily: 'Poppins-Regular',
        color: '#8CAAB9',
        marginBottom: 16
    },
    input: {
        height: 58,
        fontFamily: 'Poppins-Regular',
        paddingHorizontal: 18,
        fontSize: 16,
        color: '#FFFFFF',
        backgroundColor: '#455A64',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Poppins-Regular',
    },
});
