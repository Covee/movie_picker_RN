import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, ListItem} from 'react-native-elements'

import Modal from "react-native-modal";

const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"


export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casting: []
        };
    }

    componentDidMount() {
        
        // this.setState({casting: this.props.cast})
    }

    render() {
        
        
        let aaa = []
        aaa = this.props.cast[0]

        console.log("여기 카드다>>" + aaa)
        return (
            <View></View>
        )
        // return (
        //     <Cardarr bbb={aaa} />
        // )
    }
}


class Cardarr extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         cast1: this.props.cast
    //     };
    // }
    // state = {
    //    cast1: [],
    // }
    render () {
        // let aaa =[]
        // aaa = this.props.bbb
        // console.log("동작되니?" + aaa)
        return (
            
            <View>
                {/* <CardInfo name={aaa[[0][1]]} image={aaa[1]} char={aaa[2]} /> */}
                {/* {
                    aaa.map((cc, i) => {
                        return (
                            <CardInfo 
                                name={cc[0]}
                                image={cc[1]}
                                char={cc[2]}
                                key={i}
                            />
                            
                        );
                    })
                } */}
            </View>
        )
    }
}


class CardInfo extends Component {
    render () {
        return (
            <Card
                containerStyle={{height:'100%'}}
                image={{uri: ImageURL + '/' + this.props.image}}
                imageStyle={{height:'73%',}}
            >
                <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                    [{this.props.char}] 역
                </Text>
                <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                    {this.props.name}
                </Text>
            </Card>
        )
    }
}





