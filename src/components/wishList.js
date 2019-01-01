import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, ListItem} from 'react-native-elements'

import Modal from "react-native-modal";



export default class WishList extends Component {
    constructor(props) {
		super(props);
		this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent:'center'}}>
                <Text style={{ textAlign:'center', color: 'white',}}>This is WishList Page</Text>
                <Text style={{ textAlign:'center', color: 'white',}}>Swipe right to close</Text>
            </View>
        )
    }
}