import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Components/HomeScreen/HomeScreen';
import FirstScreen from '../Components/FirstScreen/FirstScreen';
import SignUpScreen from '../Components/SignUpScreen/signUpScreen';
import LoginScreen from '../Components/LoginScreen/LoginScreen';
import AddInTodoList from '../Components/AddInTodoList/AddInTodoList';
import LabelTaskScreen from '../Components/LabelTaskScreen/LabelTaskScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>

                <Stack.Screen name='First' component={FirstScreen} />
                <Stack.Screen name='Signup' component={SignUpScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='AddTask' component={AddInTodoList} />
                <Stack.Screen name='LabelTasks' component={LabelTaskScreen} />
                

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
