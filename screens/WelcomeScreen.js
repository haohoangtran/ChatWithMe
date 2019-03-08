import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, Alert} from 'react-native';

import {savePrefData, getPrefData} from "../sharePref";
import firebase from "react-native-firebase";
import * as Network from "../networks";
import {PacmanIndicator} from "react-native-indicators";

type Props = {};
export default class WelcomeScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            onLoginProcess: false
        }
    }

    async componentDidMount(): void {
        let username = await getPrefData("user");
        let password = await getPrefData("pass");
        if (username && password) {
            this.login(username, password)
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

    render() {
        return (
            <SafeAreaView style={{flexDirection: "column", flex: 1}}>
                <Image
                    source={require("../images/bglogin2.jpg")}
                    style={{position: "absolute", width: '100%', height: "100%", resizeMode: 'cover'}}
                />
                <View style={{flex: 1, backgroundColor: "rgba(173,20,87, 0.5)"}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../images/ic_logo_100dp.png")} width={100} height={100}/>
                    </View>
                    <View style={{flex: 0.5, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 24, color: "#FAFAFA", fontFamily: "Lucida Console"}}>CHAT WITH ME</Text>
                    </View>
                    <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('SignUp')
                            }}
                            style={{
                                width: "90%", height: 48,
                                justifyContent: "center", alignItems: "center",
                                borderWidth: 0.8, borderColor: "white", borderRadius: 48 / 2
                            }}>
                            <Text style={{fontSize: 19, color: "white", fontWeight: "bold"}}>SIGN UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}
                            style={{
                                width: "90%", height: 48,
                                marginTop: 16,
                                justifyContent: "center", alignItems: "center",
                                borderWidth: 0.8, borderColor: "white", borderRadius: 48 / 2, backgroundColor: "white"
                            }}>
                            <Text style={{fontSize: 19, color: "#AD1457", fontWeight: "bold"}}>LOGIN</Text>
                        </TouchableOpacity>
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