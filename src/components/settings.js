import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';
import Modal from "react-native-modal";
import { Font } from 'expo';


export default class Settings extends Component {
    constructor(props) {
		super(props);
		this.state = {
            isVisible: false,
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'HM': require('../../assets/fonts/BM.ttf'),
            'Nixgon': require('../../assets/fonts/NIXGON.ttf'),
            'Nanum': require('../../assets/fonts/NanumBarunGothic.ttf'),
            'NB': require('../../assets/fonts/NB.ttf'),
            'NR': require('../../assets/fonts/NR.ttf'),
        });
        this.setState({ isReady: true });
    }


    render() {
        if (this.state.isReady == true) {
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white', fontFamily: 'NB'}}>앱 정보</Text>
                </View>
                <View style={styles.flex_2}>
                    <View style={styles.name}>
                        {/* <Image /> */}
                        <Text style={{color:'#fcf8f3', fontSize:20, marginBottom:5, fontFamily: 'NB'}}>Feelm</Text>
                        <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>Version 1.0.0 (updated on 19.02.16)</Text>
                        <Text style={{color:'#fcf8f3', fontSize:12, fontFamily: 'NR'}}>Copyright (c) 2019 Cobee Kwon</Text>
                    </View>
                    <View style={styles.license}>
                        <View style={{marginBottom: 15,}}>
                            <Text style={{color:'#fcf8f3', fontSize:19, fontFamily: 'NB'}}>Licenses</Text>
                        </View>
                        <ScrollView 
                            style={{flexGrow:1,}}
                            contentcontainerstyle={{}} 
                        > 
                            <TouchableOpacity 
                                style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                activeOpacity= {1}
                            >
                                <View style={{alignSelf: 'flex-start'}} >
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        Expo
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/expo/expo/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)
                                    </Text>
                                </View>
                                <View style={{marginTop:10,}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/facebook/react-native/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) Facebook, Inc. and its affiliates.
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-card-flip
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/lhandel/react-native-card-flip/blob/master/LICENSE
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-circular-action-menu
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/geremih/react-native-circular-action-menu/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) 2015 Yousef Kamawall (under react-native-action-button)
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) 2016 Mihir Rege
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-vector-icons/Ionicons
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/oblador/react-native-vector-icons/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) 2015 Joel Arvidsson
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-modal
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/react-native-community/react-native-modal/blob/master/LICENSE.md
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) 2017 React Native Community
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-motion-slider
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/VitorCodes/react-native-motion-slider#readme
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) MIT License
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-switch-toggle
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/dooboolab/react-native-switch-toggle/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        Copyright (c) 2018 dooboolab
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                        <Image 
                            source={require('../images/movieDB.png')} 
                            resizeMode={'center'} 
                            style={{height:60, backgroundColor:'#21e6c1', alignSelf:'center', width:'100%', marginTop: 5, borderRadius: 10,}} 
                        />
                    </View>
                    <View style={styles.feedback}>
                        <Text style={{color:'#fcf8f3', fontSize:19, fontFamily: 'NB'}}>Helps & Feedback</Text>          
                    </View>
                </View>
                <View style={styles.flex_3}>
                    <Image 
                        source={require('../images/feelm_logo1.png')}
                        resizeMode={'center'} 
                        style={{height:90, width:'100%', marginTop: -10, borderRadius: 15,}} 
                    />
                </View>
                
                <Text style={{ textAlign:'center', color: '#fcf8f3', fontFamily: 'NR'}}>Swipe down to close</Text>
            </View>
        )
    } else {
        return <View><Text>Loading...</Text></View>;
      }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        },
        flex_1: {
            flex: 1,
            justifyContent: 'center',
            // paddingTop: 10,
        },
        flex_2: {
            flex: 8,
            backgroundColor: 'transparent',
            },
            name: {
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 30,
            },
            license: {
                flex: 6,                
                alignSelf: 'center',
                alignItems: 'center',
                width: '95%',
                marginBottom: 30,
            },
            feedback: {
                flex: 1,
                alignSelf: 'center',
            },
        flex_3: {
            flex: 1.3,
        },
})