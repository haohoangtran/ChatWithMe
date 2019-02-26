import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import FlashMessage from "react-native-flash-message";
import AppNavigator from "./AppNavigator";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (<View style={{flex: 1}}>
            <AppContainer/>
            <FlashMessage ref="myLocalFlashMessage"/>
        </View>);
    }
}