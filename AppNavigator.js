import React from "react";
import {View, Text} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SingUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";


const AppNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen
    },
    SignUp: {
        screen: SingUpScreen
    },
    Login: {
        screen: LoginScreen
    },
    Home: {
        screen: HomeScreen
    },



});

export default createAppContainer(AppNavigator);