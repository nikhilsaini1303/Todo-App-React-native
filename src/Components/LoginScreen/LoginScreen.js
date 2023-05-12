import { Alert, Image, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import logo from '../../assets/Images/Logo.png';
import CustomInput from '../../Helper/CustomInput/CustomInput';
import CustomButton from '../../Helper/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_USER = 'user';
const STORAGE_KEY_USERNAME = 'username';
const STORAGE_KEY_ISLOGGEDIN = 'isLoggedIn';

const LoginScreen = ({ navigation }) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();

    const onLoginPressed = async () => {
        try {
            // Validate username and password

            if(username === '') {
                Alert.alert('Please enter username!');
                return;
            }
            if(username.charAt(0) === ' ') {
                Alert.alert('Please enter valid username!');
                return;
            }
            if(password === '') {
                Alert.alert('Please enter password.');
                return;
            }
        
            // Store user session data
            const data= await AsyncStorage.getItem(STORAGE_KEY_USER);
            if(!data) {
                Alert.alert('User not found. Please create your account!');
                return;
            }
            const user = JSON.parse(data);
            // await AsyncStorage.setItem('isLoggedIn', 'true');

            if(user.username !== username ) {
                Alert.alert('User does not exitst!');
                return;
            }

            if(user.password !== password)  {
                Alert.alert('Invalid password!');
                return;
            }
            
            await AsyncStorage.setItem(STORAGE_KEY_USERNAME, username);
            await AsyncStorage.setItem(STORAGE_KEY_ISLOGGEDIN, 'true');
            navigation.navigate('Home');
            setUsername('');
            setPassword('');
        
        } catch (error) {
            console.log('Error signing in:', error);
        }
        
    }

    const onGetStartedPressed = () => {
        navigation.navigate('Signup')
    }

    return (
        <SafeAreaView style={{backgroundColor : '#ffffff'}}>
            <View style={styles.root}>
                <View  style={{alignItems: 'center'}}>
                    <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
                    <View style={styles.textCon}>
                        <Text style={styles.text}>Welcome back!</Text>
                    </View>
                </View>
                <View style={styles.txtCon}>
                    <Text style={styles.txt}>Username</Text>
                </View>
                
                <CustomInput 
                    value={username}
                    setValue={setUsername}
                    placeholder='Enter Username'
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
                        text='Log in'
                        onPress={onLoginPressed}
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.txtFooter}>Don't have an account? <Text
                        style={{color: '#9fa2f8'}}
                        onPress={onGetStartedPressed}
                        >
                            Get started!
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

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
        paddingVertical: 100
    },
    txtFooter: {
        color: '#d9d9d8',
        fontSize: 18,
        fontFamily: 'Ubuntu-Medium',
    }
});