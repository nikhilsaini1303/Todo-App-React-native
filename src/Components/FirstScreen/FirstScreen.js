import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../assets/Images/Logo.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_ISLOGGEDIN = 'isLoggedIn';

const FirstScreen = ({ navigation }) => {

  const onForwardPressed = async () => {

    try {
      const isLoggedIn = await AsyncStorage.getItem(STORAGE_KEY_ISLOGGEDIN);
  

     
      // Navigate to the authenticated screen if the user is signed in
      if (isLoggedIn === 'true') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Signup');
      }
    } catch (error) {
      console.log('Error checking sign-in status:', error);
    }
      
  }

  return (
    <View style={styles.container}>
            <LinearGradient
                colors={["#666af6", "#978ee9"]}
                style={styles.linearGradient}
            >
              <View style={styles.logoCon}>
                <Image source={logo} style={styles.logo} />
              </View>
              <View style={styles.textCon}>
                  <Text style={styles.text}>Get things done.</Text>
                  <Text style={styles.small}>Just a click away from</Text>
                  <Text style={styles.small}>planning your tasks.</Text>
              </View>
              <TouchableOpacity style={{bottom: 0, position: 'absolute', right: 0}} onPress={onForwardPressed}>
                  <View style={styles.quaterCircle}>
                    <Icon name='arrow-right' size={60} color='#fff' marginLeft={40} marginTop={20} />
                  </View>
              </TouchableOpacity>
            </LinearGradient>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBackground: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch'
  },
  linearGradient: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
  },
  logoCon: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
      marginRight: 60
  },
  logo: {
      width: 120,
      height: 120
  },
  textCon: {
      padding: 20,
      marginLeft: 20
  },
  text: {
      color: '#2c3f69',
      fontSize: 25,
      fontFamily: 'Sigmar-Regular'
  },
  small: {
      fontSize: 20,
      marginTop: 5,
      color: "#dfdfdf",
      fontFamily: "Ubuntu-MediumItalic",
      letterSpacing: 0.3,
      lineHeight: 20
  },
  quaterCircle: {
    width : 200, 
    height:200, 
    borderTopLeftRadius:200,
    borderBottomLeftRadius:0, 
    backgroundColor:'#666af6',
    alignItems: 'center',
    justifyContent: 'center'
  }
});