import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';
import Modal from "react-native-modal";


export default class Settings extends Component {
    constructor(props) {
		super(props);
		this.state = {
            // isVisible: false,
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white',}}>앱 정보</Text>
                </View>
                <View style={styles.flex_2}>
                    <View style={styles.name}>
                        {/* <Image /> */}
                        <Text style={{color:'#fcf8f3', fontSize:19, fontWeight:'400', marginBottom:5,}}>Movie Picker</Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>Version 1.0 (updated on 19.01.31)</Text>
                        <Text style={{color:'#fcf8f3', fontSize:12}}>Copyright (c) 2019 Cobee Kwon</Text>
                    </View>
                    <View style={styles.license}>
                        <Text style={{color:'#fcf8f3', fontSize:17}}>Licenses</Text>
                        <ScrollView 
                            style={{flexGrow:1}} 
                            contentContainerStyle={{alignItems:'center', backgroundColor: 'red', flexGrow:1,}}
                        >
                            <View style={{}} >
                                <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                                    Expo
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    https://github.com/expo/expo/blob/master/LICENSE
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                                    react-native
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    https://github.com/facebook/react-native/blob/master/LICENSE
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    Copyright (c) Facebook, Inc. and its affiliates.
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                                    react-native-card-flip
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    https://github.com/lhandel/react-native-card-flip/blob/master/LICENSE
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                                    react-native-circular-action-menu
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    https://github.com/geremih/react-native-circular-action-menu/blob/master/LICENSE
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    Copyright (c) 2015 Yousef Kamawall (under react-native-action-button)
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    Copyright (c) 2016 Mihir Rege
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                                    react-native-vector-icons/Ionicons
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    https://github.com/oblador/react-native-vector-icons/blob/master/LICENSE
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    Copyright (c) 2015 Joel Arvidsson
                                </Text>
                            </View>
                            <View style={{marginTop:10}}>
                                <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                                    react-native-modal
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    https://github.com/react-native-community/react-native-modal/blob/master/LICENSE.md
                                </Text>
                                <Text style={{color:'#fcf8f3', fontSize:13}}>
                                    Copyright (c) 2017 React Native Community
                                </Text>
                            </View>

                        </ScrollView>
                        {/* 여기엔 button modal로 IMDB 쓴거에 대한 설명과 copyright */}
                        <View style={{}}>
                            <Image 
                                source={require('../images/movieDB.png')} 
                                resizeMode={'center'} 
                                style={{height:60, backgroundColor:'#21e6c1'}} 
                            />
                        </View>
                        
                    </View>
                    <View style={styles.feedback}>
                        <Text style={{color:'#fcf8f3', fontSize:17, marginTop:10,}}>Helps & Feedback</Text>
                    </View>
                </View>
                <View style={styles.flex_3}>
                    {/* 여긴 앱 로고 아마도... */}
                </View>
                
                <Text style={{ textAlign:'center', color: '#fcf8f3',}}>Swipe right to close</Text>


                {/* <Modal
                    isVisible={this.state.isVisible}
                    onSwipe={() => this.setState({ isVisible: false })}
                    swipeDirection="right"
                >
                    <View>
                        <Text style={{color:'#fcf8f3', fontSize:18}}>Licenses</Text>
                        <Text></Text>
                    </View>
                </Modal> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        },
        flex_1: {
            flex: 2,
            justifyContent: 'center',
            paddingTop: 10,
        },
        flex_2: {
            flex: 9,
            backgroundColor: 'transparent',
            },
            name: {
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 60,
            },
            license: {
                flex: 6,                
                alignSelf: 'center',
                alignItems: 'center',
                width: '95%',
                marginBottom: 60,
            },
            feedback: {
                flex: 1,
                alignSelf: 'center',
            },
        flex_3: {
            flex: 1,
            alignSelf: 'center',
        },
})