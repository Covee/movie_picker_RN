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
                        <Text style={{color:'#e73a53', fontSize:20, marginBottom:5, fontFamily: 'NB'}}>Feelm</Text>
                        <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>Version 1.0.1 (updated on 19.03.03)</Text>
                        <Text style={{color:'#fcf8f3', fontSize:12, fontFamily: 'NR'}}>Copyright (c) 2019 Cobee Kwon</Text>
                    </View>
                    <View style={styles.howToUse}>
                        <View style={{marginBottom: 15,}}>
                            <Text style={{color:'#fcf8f3', fontSize:19, fontFamily: 'NB'}}>공지사항</Text>
                        </View>
                        <ScrollView style={{flexGrow:1,}}> 
                            <TouchableOpacity 
                                style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                activeOpacity= {1}
                            >
                                <View style={{alignSelf: 'flex-start'}} >
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        사용방법과 소감! [ 첫 버젼입니다! :) ]
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        안녕하세요, 개발자 Cobee입니다.
                                        처음 만들어 본 앱이라 부족한 점이 많겠지만, 많은 피드백주시고 애용해주세요! :D
                                    </Text>
                                    <Text> </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NB'}}>
                                        Features
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        1. 간혹 무한 로딩하는 이미지가 보일 때가 있는데, 그럴 땐 한번만 더 믹스(mix) 버튼을 눌러주세요!
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        2. 현재 개발자인 제가 모든 디자인을 했더니 색상과 배치 등의 모든 앱디자인이 매우 구ㄹ.. 예쁘지 않네요. 다음 업데이트 때 좀 더 개선해 보도록 하겠습니다.
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        3. 제가 제일 처음 써보니 다 좋은데 년도 필터가 없는게 불편했어요. 근데 왜 그 기능이 없냐? 계속해서 하나씩 부족한 부분을 고치다보니 끝이 없어서... 일단 부족하지만 첫 번째 버젼을 내고 추후 자주 업데이트를 해야겠다 싶었다는 개발자의 고충입니다...ㅠ_ㅠ (그리고 가장 중요한 모든 기능은 잘 된다구요...쭈굴쭈굴)
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        4. (Upcoming)Helps & Feedback 밑에 로고 버튼을 누르시면 저에게 피드백을 주실 수 있게끔 기능을 연결 하겠습니다! 그 전까지는 번거로우시겠지만 uniqtop91@gmail.com 으로 피드백 주시면 감사하겠습니다 :D
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.license}>
                        <View style={{marginBottom: 10,}}>
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
                                <View style={{marginTop:10}}>
                                    <Text style={{color:'#fcf8f3', fontSize:14, fontFamily: 'NB'}}>
                                        react-native-indicators
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                        https://github.com/n4kz/react-native-indicators/blob/master/license.txt
                                    </Text>
                                    <Text style={{color:'#fcf8f3', fontSize:13, fontFamily: 'NR'}}>
                                    BSD License | Copyright 2017-2018 Alexander Nazarov. All rights reserved.
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
                <View style={{flex:0.2, justifyContent: 'flex-end', marginTop: 15,}}>
                    <Text style={{ textAlign:'center', color: '#fcf8f3', fontFamily: 'NR',}}>Swipe Right to close</Text>
                </View>
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
            howToUse: {
                flex: 3.5,                
                alignSelf: 'center',
                alignItems: 'center',
                width: '95%',
                marginBottom: 15,
                marginTop: 10,
            },
            license: {
                flex: 4.5,                
                alignSelf: 'center',
                alignItems: 'center',
                width: '95%',
                marginBottom: 15,
            },
            feedback: {
                flex: 0.5,
                alignSelf: 'center',
            },
        flex_3: {
            flex: 1.3,
            marginTop: 20,
        },
})