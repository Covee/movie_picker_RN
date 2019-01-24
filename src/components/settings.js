import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';


export default class Settings extends Component {
    constructor(props) {
		super(props);
		this.state = {
            
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white',}}>Information</Text>
                </View>
                <View style={styles.flex_2}>
                    <View>
                        <Text>[앱 이름]</Text>
                        <Text>Version: 1.0</Text>
                    </View>
                    <View>
                        <Text>Licenses</Text>
                        {/* 여기엔 button modal로 IMDB 쓴거에 대한 설명과 copyright */}
                    </View>
                    <View>
                        <Text>Feedback </Text>
                    </View>
                </View>
                <View style={styles.flex_3}>
                    {/* 여긴 앱 로고 아마도... */}
                </View>
                
                <Text style={{ textAlign:'center', color: 'white',}}>Swipe down to close</Text>
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
            justifyContent: 'flex-end',
            paddingBottom: 5,
        },
        flex_2: {
            flex: 12,
            backgroundColor: 'transparent',
        },
        flex_3: {
            flex: 1,
        },
})