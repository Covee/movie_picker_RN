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
        cast: null,
    };
    
    _cast = () => {
        // let start = 0
        // let numCast = json.cast.length()
        // let arr = []
    
        fetch(mainURL + 'movie/' + this.props.id + '/credits?api_key=' + API_KEY + '&language=ko-KR')
        .then(response => response.json()
            .then(json => {
                // while (start >= numCast) {
                //     arr.concat(json.cast[start])
                //     start = start + 1
                // }
                this.setState({
                    cast: json.cast[0]
                })
                
                console.log("cast>>> " + this.state.cast)
            })
        )
    }

    componentDidMount() {
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