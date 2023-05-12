import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#f3f8fb',
        width: '100%',
        height: 50,

        borderColor: '#dff2f2',
        borderWidth: 1,
        borderRadius: 20,

        paddingHorizontal: 10,
        // paddingVertical: 10,
        marginVertical: 10,
    },
    input: {
        // marginVertical: 13
        color: '#687593',
        fontFamily: 'Ubuntu-Regular'
    }
});