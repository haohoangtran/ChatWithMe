/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import firebase from 'react-native-firebase';
import App from '../App';
import * as Network from "../networks"

import {savePrefData, getPrefData} from "../sharePref";

type Props = {};
export default class LoginScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            user: "", pass: "", onLoginProcess: false
        }
    }

    renderIndicator() {
        if (this.state.onLoginProcess) {
            return (
                <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(227, 216, 220, 0.7)",
                    flexDirection: "column"
                }}>
                    <PacmanIndicator color='white'/>
                </View>)
        }
    }

    async login(username, password) {
        const fcmToken = await firebase.messaging().getToken();
        this.setState({onLoginProcess: true});
        Network.post('/user/login', {
            username, password, token: fcmToken
        }, {}, (err, data) => {
            console.log(data)
            this.setState({onLoginProcess: false});
            if (err) {
                Alert.alert("Lỗi", "Có lỗi xảy ra, kiểm tra kết nối mạng " + err)
            } else {
                if (data.status) {
                    Network.setUserToken(data.token);
                    this.props.navigation.navigate('Home')
                } else {
                    Alert.alert("Thông báo", data.message);
                }
            }
        })

    }

    render() {
        return (
            <SafeAreaView style={{flexDirection: "column", flex: 1}}>
                <Image
                    source={require("../images/bglogin2.jpg")}
                    style={{position: "absolute", width: '100%', height: "100%", resizeMode: 'cover'}}
                />
                <View style={{flex: 1, backgroundColor: "rgba(207, 216, 220, 0.7)"}}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../images/logo2.png")} width={40} height={40}/>
                    </View>
                    <View style={{flexDirection: "column", flex: 2, marginLeft: 24, marginRight: 24}}>
                        <View style={{flexDirection: "column", flex: 1.25}}>
                            <Text style={{fontSize: 16, color: '#AD1457'}}>TÀI KHOẢN</Text>
                            <TextInput
                                style={{fontSize: 16}}
                                underlineColorAndroid="#a3a0a7"
                                onChangeText={(user) => this.setState({user})}
                                value={this.state.user}
                                placeholder={"Nhập tài khoản"}/>
                            <Text style={{fontSize: 16, color: '#AD1457'}}>MẬT KHẨU</Text>
                            <TextInput
                                style={{fontSize: 16}}
                                underlineColorAndroid="#a3a0a7"
                                onChangeText={(pass) => this.setState({pass})}
                                value={this.state.pass}
                                placeholder={"Nhập mật khẩu"}/>
                            <Text style={{textAlign: "right", color: "#FAFAFA", textDecorationLine: 'underline'}}>Quên
                                mật khẩu</Text>
                        </View>
                        <View style={{flexDirection: "column", flex: 1}}>
                            <View style={{flexDirection: "column", flex: 0.3}}>
                                <TouchableOpacity
                                    onPress={() => this.login(this.state.user, this.state.pass)}
                                    style={{
                                        width: "100%", height: 42,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 0.8, borderColor: "white", borderRadius: 42 / 2,
                                        backgroundColor: "#FAFAFA",
                                    }}>
                                    <Text style={{fontSize: 16, color: "#AD1457", fontWeight: "bold"}}>LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', flex: 0.25}}>
                                <View style={{
                                    backgroundColor: '#9E9E9E',
                                    height: 1.25,
                                    flex: 1,
                                    alignSelf: 'center',
                                    lineHeight: 0.5
                                }}/>
                                <Text
                                    style={{color: '#000000', alignSelf: 'center', paddingHorizontal: 5, fontSize: 10}}>OR
                                    CONNECT WITH</Text>
                                <View style={{backgroundColor: '#9E9E9E', height: 1.25, flex: 1, alignSelf: 'center'}}/>
                            </View>
                            <View style={{flexDirection: 'row', flex: 0.3}}>
                                <View style={{flex: 1, paddingRight: 6}}>
                                    <TouchableOpacity
                                        style={{
                                            width: "100%", height: 42,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 0.8, borderColor: "#4267b2", borderRadius: 42 / 2,
                                            backgroundColor: "#4267b2", flexDirection: "row"
                                        }}>
                                        <Image
                                            source={require("../images/ic_fb_24dp.png")}
                                            style={{position: "relative", left: 0}}
                                        />
                                        <Text
                                            style={{fontSize: 16, color: "#E9EBEE", fontWeight: "bold"}}>FACEBOOK</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 1, paddingLeft: 6}}>
                                    <TouchableOpacity
                                        style={{
                                            width: "100%", height: 42,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 0.8, borderColor: "#EA4335", borderRadius: 42 / 2,
                                            backgroundColor: "#EA4335", flexDirection: "row"
                                        }}>
                                        <Image
                                            source={require("../images/ic_google_24dp.png")}
                                            style={{position: "relative", left: 0}}
                                        />
                                        <Text style={{fontSize: 16, color: "#E9EBEE", fontWeight: "bold"}}>GOOGLE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: "column", flex: 0.5}}>

                        </View>
                    </View>
                </View>
                {this.renderIndicator()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
