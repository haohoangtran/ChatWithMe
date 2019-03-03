import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import FlashMessage from "react-native-flash-message";
import AppNavigator from "./AppNavigator";

import firebase from 'react-native-firebase';
import type {Notification, NotificationOpen, RemoteMessage} from 'react-native-firebase';
import {showMessage, hideMessage} from "react-native-flash-message";
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    async componentDidMount(): void {
        showMessage({
            message: "Có tin nhắn mới này nhóc",
            description: "hihihhahhehe",
            type: "success",
        });
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            console.log("notui", notification)
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            console.log("noti", notification, notification['_body'])
            showMessage({
                message: "Ksmart Manager",
                description: notification['_body'],
                type: "success",
            });
        });

    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    render() {
        return (<View style={{flex: 1}}>
            <AppContainer/>
            <FlashMessage ref="myLocalFlashMessage"/>
        </View>);
    }
}