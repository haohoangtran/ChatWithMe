import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import FlashMessage from "react-native-flash-message";
import AppNavigator from "./AppNavigator";

import firebase from 'react-native-firebase';
import type {Notification, NotificationOpen, RemoteMessage} from 'react-native-firebase';
import {showMessage, hideMessage} from "react-native-flash-message";
import {savePrefData} from "./sharePref";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    static DeviceToken = "";
    render() {
        return (<View style={{flex: 1}}>
            <AppContainer/>
            <FlashMessage ref="myLocalFlashMessage"/>
        </View>);
    }
}