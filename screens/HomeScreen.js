import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import firebase from "react-native-firebase";
import type {Notification, NotificationOpen, RemoteMessage} from 'react-native-firebase';
import {showMessage, hideMessage} from "react-native-flash-message";
import * as NetWork from '../networks'

type Props = {};

export default class HomeScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            myID: ""
        }
    }

    async componentDidMount(): void {
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            console.log("notui", notification)
        });
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            console.log("noti", notification, notification['_body']);
            showMessage({
                message: notification['_title'],
                description: notification['_body'],
                type: "success",
            });
            this.loadMessage();
        });
        this.loadMessage();
    }

    loadMessage() {
        NetWork.get("message", {}, (err, data) => {
            console.log("ccqqq", data);
            let idUser = data.iduser;
            if (data.status) {
                this.setState({
                    messages: data.msg.map(i => {
                        const isMe = i.from == idUser;
                        return {
                            ...i,
                            text: i.message,
                            createdAt: new Date(i.date),
                            user: {_id: i.from, name: isMe ? "Me" : "Friend"}
                        }
                    }), myID: idUser
                })
            }
        })
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    componentWillMount() {

    }

    goqueue() {
        NetWork.get('message/goqueue', {}, (err, data) => {
            if (err) {
                return showMessage({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng",
                    type: "danger",
                })
            }
            if (data.status) {
                this.loadMessage();
            } else {
                showMessage({
                    message: "Lỗi",
                    description: data.message,
                    type: "danger",
                })
            }
        })
    }

    endChat() {
        NetWork.get('message/endchat', {}, (err, data) => {
            if (err) {
                return showMessage({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng",
                    type: "danger",
                })
            }
            if (data.status) {
                this.loadMessage();
            } else {
                showMessage({
                    message: "Lỗi",
                    description: data.message || "Hi",
                    type: "danger",
                })
            }
        })
    }

    sendMessage(message) {
        NetWork.post('message/send', {message}, {}, (err, data) => {
            if (err) {
                return showMessage({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng",
                    type: "danger",
                })
            }
            if (data.status) {
                this.loadMessage();
            } else {
                showMessage({
                    message: "Lỗi",
                    description: data.message || "Hi",
                    type: "danger",
                })
            }
        })
    }

    onSend(messages = []) {
        let msg = messages[0];
        const txt = msg.text.toLowerCase().trim();
        if (txt == '/end') {
            this.endChat();
        } else if (txt == '/start') {
            this.goqueue()
        } else {
            this.sendMessage(txt);
        }
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#38ff00"
                }}>
                    <Text style={{fontSize: 18}}>Người lạ</Text>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.myID,
                    }}
                    locale={'vi'}
                    dateFormat={"LLL"}
                    placeholder={"Nhập tin nhắn . . ."}
                />
            </View>
        )
    }
}