import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, ListItem} from 'react-native-elements'

import Modal from "react-native-modal";



export default class HaveSeen extends Component {
    constructor(props) {
		super(props);
		this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white',}}>This is HaveSeen Page</Text>
                </View>
                <View style={styles.flex_2}>
                    <TouchableOpacity style={styles.items}>
                        <View style={{flex:4}}>
                            <Text style={{fontWeight:'600',}}>TITLE (years) </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text> Rating</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.items}>
                        <View style={{flex:4}}>
                            <Text>TITLE (years) </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text> Rating</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.flex_3}>

                </View>
                

                
                <Text style={{ textAlign:'center', color: 'white',}}>Swipe right to close</Text>
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
            justifyContent: 'flex-end',
            paddingBottom: 5,
        },
        flex_2: {
            flex: 9,
            borderRadius: 5,
            borderColor: 'black',
            borderWidth: 2,
            backgroundColor: 'lightgreen',

            },
            items: {
                flexDirection:'row',
                backgroundColor: 'yellow',
                width: '95%',
                height: 30,
                alignSelf: 'center',

                marginTop: 5,

            },
        flex_3: {
            flex: 1,
        },
        

})