import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';


type Props = {};
export default class WelcomeScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            a: 1
        }
    }

    render() {
        return (
            <SafeAreaView style={{flexDirection: "column", flex: 1, backgroundColor: "red"}}>
                <Image
                    source={require("../images/bglogin.jpg")}
                    style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}
                />
                <View style={{flex: 1, backgroundColor: "rgba(52, 52, 52, 0.8)"}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../images/convoito.png")} width={40} height={40}/>
                    </View>
                    <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity
                            onPress={()=>this.setState({a:this.state.a+1})}
                            style={{
                            width: "90%", height: 48,
                            justifyContent: "center", alignItems: "center",
                            borderWidth: 0.8, borderColor: "white", borderRadius: 48 / 2
                        }}>
                            <Text style={{fontSize: 19, color: "white"}}>SIGN UP {this.state.a}</Text>
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
                            <Text style={{fontSize: 19, color: "pink"}}>LOGIN</Text>
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