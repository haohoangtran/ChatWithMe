import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';


type Props = {};
export default class WelcomeScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        // this.state = {
        //     a: 1
        // }
    }

    render() {
        return (
            <SafeAreaView style={{flexDirection: "column", flex: 1, backgroundColor: "red"}}>
                <Image
                    source={require("../images/bglogin2.jpg")}
                    style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}
                />
                <View style={{flex: 1, backgroundColor: "rgba(173,20,87, 0.5)"}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../images/ic_logo_100dp.png")} width={100} height={100}/>
                    </View>
                    <View style={{flex: 0.5, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 24, color: "#FAFAFA",fontFamily: "Lucida Console"}}>CHAT WITH ME</Text>
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
                            <Text style={{fontSize: 19, color: "white",fontWeight: "bold"}}>SIGN UP</Text>
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
                            <Text style={{fontSize: 19, color: "#AD1457",fontWeight: "bold"}}>LOGIN</Text>
                        </TouchableOpacity>
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