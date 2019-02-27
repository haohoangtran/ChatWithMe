/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class LoginScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            user: "", pass: ""
        }
    }

    render() {
        return (
            <SafeAreaView style={{flexDirection: "column", flex: 1, backgroundColor: "red"}}>
                <Image
                    source={require("../images/bglogin2.jpg")}
                    style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}
                />
                <View style={{flexDirection: "column", flex: 1}}>

                </View>
                <View style={{flexDirection: "column", flex: 2}}>
                    <View style={{flexDirection: "column", flex: 1}}>
                        <Text>AAAAAA</Text>
                        <TextInput
                            onChangeText={(user) => this.setState({user})}
                            value={this.state.user}
                            placeholder={"Nhap user"}></TextInput>
                        <Text>AAAAAA</Text>
                        <TextInput
                            onChangeText={(user) => this.setState({user})}
                            value={this.state.user}
                            placeholder={"Nhap pass"}></TextInput>
                        <Text style={{alignSelf: "right"}}>Quen pass</Text>
                    </View>
                    <View style={{flexDirection: "column", flex: 1}}>

                    </View>
                    <View style={{flexDirection: "column", flex: 0.5}}>

                    </View>
                </View>

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
