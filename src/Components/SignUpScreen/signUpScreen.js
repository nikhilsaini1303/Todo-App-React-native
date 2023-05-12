import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import logo from '../../assets/Images/Logo.png';
import CustomInput from '../../Helper/CustomInput/CustomInput';
import CustomButton from '../../Helper/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_USER = 'user';
const STORAGE_KEY_ISLOGGEDIN = 'isLoggedIn';

const SignUpScreen = ({ navigation }) => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();

    const onSignupPressed = async () => {
        try {
            //Validation 
            if(username === '') {
                Alert.alert('Please enter username.');
                return;
            }
            if(username.charAt(0) === ' ') {
                Alert.alert('Please enter valid username!');
                return;
            }
            if(email === '') {
                Alert.alert('Please enter email.');
            }
            if(email.charAt(0) === ' ') {
                Alert.alert('Please enter valid email!');
                return;
            }
            if(password === '') {
                Alert.alert('Please enter password.');
                return;
            }
            if(password.charAt(0) === ' ') {
                Alert.alert('Please enter valid password!');
                return;
            }
            if(password.length < 6) {
                Alert.alert('Please enter password length minimum 6.');
                return;
            }

            // Check if the username is already taken
            const existingUser = await AsyncStorage.getItem(STORAGE_KEY_USER);

            // const User = JSON.parse(existingUser);
            // if (User.username === username) {
            //     Alert.alert('Username already exists!');
            //     return;
            // }
            // if(User.email === email) {
            //     Alert.alert('Email alreadu exits!S');
            //     return;
            // }
        
            // Create a new user object with the provided username and password
            const user = {
                username,
                email,
                password,
            };
        
            // Store the user object in AsyncStorage
            await AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
            await AsyncStorage.setItem(STORAGE_KEY_ISLOGGEDIN, 'true');
            setEmail('');
            setPassword('');
            setUsername('');
            navigation.navigate('Home');
        } catch (error) {
            console.log('Error signing up:', error);
        }
        
    }

    const onLoginPressed = () => {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={{backgroundColor : '#ffffff'}}>
            <View style={styles.root}>
                <View  style={{alignItems: 'center'}}>
                    <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
                    <View style={styles.textCon}>
                        <Text style={styles.text}>Let's get started!</Text>
                    </View>
                </View>
                <View style={styles.txtCon}>
                    <Text style={styles.txt}>Username</Text>
                </View>
                <ScrollView>
                    <CustomInput 
                        value={username}
                        setValue={setUsername}
                        placeholder='Enter Username'
                    />
                    <View style={styles.txtCon}>
                        <Text style={styles.txt}>Email Address</Text>
                    </View>
                    
                    <CustomInput 
                        value={email}
                        setValue={setEmail}
                        placeholder='Enter Email'
                    />
                    <View style={[styles.txtCon, {marginTop: 10}]}>
                        <Text style={styles.txt}>Password</Text>
                    </View>
                    <CustomInput 
                        value={password}
                        setValue={setPassword}
                        placeholder='Enter Password'
                        secureTextEntry
                    />
                    <View style={{alignItems: 'center', marginTop: 10}}>
                        <CustomButton 
                            text='Sign up'
                            onPress={onSignupPressed}
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.txtFooter}>Already an account? <Text
                        style={{color: '#9fa2f8'}}
                        onPress={onLoginPressed}
                        >
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    root: {
        // alignItems: 'center',
        padding: 20,
        marginVertical: 20,
        backgroundColor: '#ffffff'
    },
    logo: {
        alignItems: 'center',
        width: '70%',
        maxWidth: 200,
        maxHeight: 200
    },
    textCon: {
        marginTop: 20,
    },
    text: {
        color: '#2c3f69',
        fontSize: 25,
        fontFamily: 'Sigmar-Regular'
    },
    txtCon: {
        marginLeft: 10
    }, 
    txt: {
        textAlign: 'left',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 18,
        color: '#dfdfdf',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 15
    },
    txtFooter: {
        color: '#d9d9d8',
        fontSize: 18,
        fontFamily: 'Ubuntu-Medium',
    }
});