type Props = {};
import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat'
import {Platform, StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';

export default class HomeScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
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
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Chat với tao hihi</Text>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        )
    }
}