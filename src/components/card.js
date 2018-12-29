import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, ListItem} from 'react-native-elements'

import Modal from "react-native-modal";

const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b"




export default class Cards extends Component {
    constructor(props) {
		super(props);
		this.state = {
            // cast: null,
        };
    }
    state = {
        cast: [],
    };
    
    _arrCast = () => {
        let numCast = 0
        let arr = []

        for (let i = 0; i < numCast; i++) {
            arr.push()
        }
    }


    _cast = () => {
        let arr = [];

        fetch(mainURL + 'movie/' + this.props.id + '/credits?api_key=' + API_KEY + '&language=ko-KR')
        .then(response => response.json()
            .then(json => {
                for (let i = 0; i < json.cast.length; i++) {
                    arr.push([json.cast[i].profile_path, json.cast[i].character, json.cast[i].name])
                }

                this.setState({
                    cast: json.cast[0].name,
                })
                
                // console.log("cast>>> " + this.state.cast)
            })
        )
    }


    componentDidMount() {
        this.props.filter()
        this._cast()
    }

    render() {
        const { cast } = this.state;
        return (
            <ScrollView 
                horizontal={true} style={{flex:1, flexDirection: 'row'}}
                contentContainerStyle={{alignItems: 'center'}}    
            >
                <TouchableOpacity activeOpacity= {1}>
                    <View style={{flex:1, flexDirection:'row'}}>

                        <Card
                            // image={require()}
                            title={cast}
                        >
                        </Card>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}