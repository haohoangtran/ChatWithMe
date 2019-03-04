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

    async componentDidMount(): void {
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            savePrefData("devicetoken", fcmToken)
        } else {
            Alert.alert("Lỗi", "Thiết bị của bạn chưa được hỗ trợ, liên hệ quản trị viên. Mã lỗi: 0x69")
        }
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