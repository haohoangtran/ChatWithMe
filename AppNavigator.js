import React from "react";
import {View, Text} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SingUpScreen from "./screens/SignUpScreen";


const AppNavigator = createStackNavigator({
    SignUp: {
        screen: SingUpScreen
    },
    Welcome: {
        screen: WelcomeScreen
    },
    Login: {
        screen: LoginScreen
    },



});

export default createAppContainer(AppNavigator);