import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';
import * as Network from "../networks";
import {PacmanIndicator} from "react-native-indicators";


type Props = {};
export default class SignUpScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    renderIndicator() {
        if (this.state.onRegisterProcess) {
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

    constructor(props) {
        super(props);
        this.state = {
            user: "", pass: "", email: "", phone: "", name: "", onRegisterProcess: false,
        }
    }

    render() {
        return (
            <SafeAreaView style={{flexDirection: "column", flex: 1, backgroundColor: "red"}}>
                <Image
                    source={require("../images/bglogin2.jpg")}
                    style={{position: "absolute", width: '100%', height: "100%", resizeMode: 'cover'}}
                />
                <View style={{flex: 1, backgroundColor: "rgba(207, 216, 220, 0.7)"}}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 12}}>
                        <Image source={require("../images/ic_logo_64dp.png")} width={64} height={64}/>
                    </View>
                    <View style={{flex: 5, flexDirection: "column", marginLeft: 24, marginRight: 24}}>
                        <Text style={{fontSize: 14, color: '#AD1457'}}>TÀI KHOẢN</Text>
                        <TextInput
                            style={{fontSize: 16}}
                            underlineColorAndroid="#a3a0a7"
                            onChangeText={(user) => this.setState({user})}
                            value={this.state.user}

                            placeholder={"Nhập tài khoản"}></TextInput>
                        <Text style={{fontSize: 14, color: '#AD1457'}}>MẬT KHẨU</Text>
                        <TextInput
                            style={{fontSize: 16}}
                            underlineColorAndroid="#a3a0a7"
                            onChangeText={(pass) => this.setState({pass})}
                            value={this.state.pass}
                            secureTextEntry={true}
                            placeholder={"Nhập mật khẩu"}></TextInput>
                        <Text style={{fontSize: 14, color: '#AD1457'}}>HỌ TÊN</Text>
                        <TextInput
                            style={{fontSize: 16}}
                            underlineColorAndroid="#a3a0a7"
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            placeholder={"Nhập họ tên"}></TextInput>
                        <Text style={{fontSize: 16, color: '#AD1457'}}>EMAIL</Text>
                        <TextInput
                            style={{fontSize: 16}}
                            underlineColorAndroid="#a3a0a7"
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            placeholder={"Nhập email"}></TextInput>
                        <Text style={{fontSize: 14, color: '#AD1457'}}>SỐ ĐIỆN THOẠI</Text>
                        <TextInput
                            style={{fontSize: 16}}
                            underlineColorAndroid="#a3a0a7"
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                            placeholder={"Nhập số điện thoại"}></TextInput>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 24,
                        marginRight: 24,
                        marginTop: 24
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({onRegisterProcess: true})
                                Network.post('user/register', {
                                    username: this.state.user,
                                    password: this.state.pass,
                                }, {}, (err, data) => {
                                    this.setState({onRegisterProcess: false});
                                    if (err) {
                                        Alert.alert("Lỗi", err)
                                    } else {
                                        Alert.alert("Thông báo", data.message, [
                                                {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                                            ],
                                            {cancelable: false},);
                                    }
                                })
                            }}
                            style={{
                                width: "100%", height: 42,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 0.8, borderColor: "white", borderRadius: 42 / 2,
                                backgroundColor: "#FAFAFA",
                            }}>
                            <Text style={{fontSize: 20, color: "#AD1457", fontWeight: "bold"}}>SIGN UP</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{flex: 1}}>
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