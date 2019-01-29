import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';
import Modal from "react-native-modal";


class Licenses extends Component {
    constructor(props) {
		super(props);
		this.state = {
        };
    }

    render() {
        return (
            <ScrollView 
                style={{flexGrow:1, alignItems:'center'}} 
            > 
                    
                        <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                            Expo
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            https://github.com/expo/expo/blob/master/LICENSE
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)
                        </Text>
                    
                        <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                            react-native
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            https://github.com/facebook/react-native/blob/master/LICENSE
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            Copyright (c) Facebook, Inc. and its affiliates.
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                            react-native-card-flip
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            https://github.com/lhandel/react-native-card-flip/blob/master/LICENSE
                        </Text>
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
                        <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                            react-native-vector-icons/Ionicons
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            https://github.com/oblador/react-native-vector-icons/blob/master/LICENSE
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            Copyright (c) 2015 Joel Arvidsson
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13, fontWeight:'500'}}>
                            react-native-modal
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            https://github.com/react-native-community/react-native-modal/blob/master/LICENSE.md
                        </Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>
                            Copyright (c) 2017 React Native Community
                        </Text>
                {/* <View style={{flex:1}}>
                    <Image 
                        source={require('../images/movieDB.png')} 
                        resizeMode={'center'} 
                        style={{height:60, backgroundColor:'#21e6c1'}} 
                    />
                </View> */}
            </ScrollView>
             
        )
    }
}


export default class Settings extends Component {
    constructor(props) {
		super(props);
		this.state = {
            isVisible: false,
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
                        <Text style={{color:'#fcf8f3', fontSize:20, fontWeight:'500', marginBottom:5,}}>Feelm</Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>Version 1.0 (updated on 19.01.31)</Text>
                        <Text style={{color:'#fcf8f3', fontSize:12}}>Copyright (c) 2019 Cobee Kwon</Text>
                    </View>
                    <View style={styles.license}>
                        <View style={{marginBottom: 15,}}>
                            <Text style={{color:'#fcf8f3', fontSize:19, fontWeight:'500',}}>Licenses</Text>
                        </View>
                        <ScrollView 
                            style={{flexGrow:1,}}
                            contentcontainerstyle={{}} 
                        > 
                            <TouchableOpacity 
                                style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                activeOpacity= {1}
                            >
                                <View style={{}} >
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
                                        Expo
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        https://github.com/expo/expo/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)
                                    </Text>
                                </View>
                                <View style={{marginTop:10,}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
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
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
                                        react-native-card-flip
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        https://github.com/lhandel/react-native-card-flip/blob/master/LICENSE
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
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
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
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
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
                                        react-native-modal
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        https://github.com/react-native-community/react-native-modal/blob/master/LICENSE.md
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        Copyright (c) 2017 React Native Community
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
                                        react-native-motion-slider
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        https://github.com/VitorCodes/react-native-motion-slider#readme
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        Copyright (c) MIT License
                                    </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontWeight:'500'}}>
                                        react-native-switch-toggle
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
                                        https://github.com/dooboolab/react-native-switch-toggle/blob/master/LICENSE
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13}}>
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
                        <Text style={{color:'#fcf8f3', fontSize:19, fontWeight:'500',}}>Helps & Feedback</Text>          
                    </View>
                </View>
                <View style={styles.flex_3}>
                    <Image 
                        source={require('../images/feelm_logo1.png')} 
                        resizeMode={'center'} 
                        style={{height:90, width:'100%', marginTop: -10, borderRadius: 15,}} 
                    />
                </View>
                
                <Text style={{ textAlign:'center', color: '#fcf8f3',}}>Swipe down to close</Text>
            </View>
        )
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