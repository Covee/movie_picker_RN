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
                        <Text style={{color:'#fcf8f3', fontSize:19, fontWeight:'400'}}>Movie Picker</Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>Version: 1.0</Text>
                        <Text style={{color:'#fcf8f3', fontSize:13}}>Cobee Kwon</Text>
                        <Text style={{color:'#fcf8f3', fontSize:12}}>Copyright 2019</Text>
                    </View>
                    <View 
                        style={styles.license}
                        // onPress={()=>this.setState({isVisible:true})}
                    >
                        <Text style={{color:'#fcf8f3', fontSize:17}}>Licenses</Text>
                        <ScrollView 
                            style={{flex:3, width:'95%', backgroundColor:'yellow'}} 
                            contentContainerStyle={{alignItems:'center'}}
                        >
                            <Text style={{color:'#fcf8f3', fontSize:13}}>all the libraries...</Text>
                        </ScrollView>
                        {/* 여기엔 button modal로 IMDB 쓴거에 대한 설명과 copyright */}
                        <View style={{flex:0.3}}>
                            <Image 
                                source={require('../images/movieDB.png')} 
                                resizeMode={'contain'} 
                                style={{height:90, backgroundColor:'#21e6c1'}} 
                            />
                        </View>
                        
                    </View>
                    <View style={styles.feedback}>
                        <Text style={{color:'#fcf8f3', fontSize:17}}>Helps & Feedback</Text>
                    </View>
                </View>
                <View style={styles.flex_3}>
                    {/* 여긴 앱 로고 아마도... */}
                </View>
                
                <Text style={{ textAlign:'center', color: '#fcf8f3',}}>Swipe down to close</Text>


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
            justifyContent: 'flex-start',
            paddingTop: 10,
        },
        flex_2: {
            flex: 7,
            backgroundColor: 'transparent',
            },
            name: {
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: 15,
            },
            license: {
                flex: 4,
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 15,
                width: '95%',
                backgroundColor:'red'
            },
            feedback: {
                flex: 2,
                alignSelf: 'center',
                marginTop: 15,
            },
        flex_3: {
            flex: 1,
            alignSelf: 'center',
        },
})