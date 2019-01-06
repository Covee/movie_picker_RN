import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import { Card, ListItem} from 'react-native-elements'

import Modal from "react-native-modal";

const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b"


export default class HaveSeen extends Component {
    constructor(props) {
		super(props);
		this.state = {
            title: [],
            year: [],
            rating: [],
        };
    }


    _showHaveSeen = async () => {
        let data = await AsyncStorage.getItem('id')
        let ids = JSON.parse(data)

        // console.log("이거다" + ids[0], ids[1], ids[2])
        try {
            idArr = []
            for(i=0; i<ids.length; i++) {
                fetch(mainURL + 'movie/' + ids[i] + '?api_key=' + API_KEY + '&language=ko-KR')
                .then(response => response.json())
                .then(json => {
                    idArr.push(json.title)
                    console.log("lalala" + idArr[0])
                })
            }
            // console.log(idArr)

            // this.setState({
            //     title: idArr,
            //     year: idArr[0][1],
            //     rating: idArr[0][2],
            // })
            // console.log(idArr)
            // console.log("제목: " +this.state.title + " (" + this.state.year + ") 평점:" + this.state.rating)
            
        } catch(error) {
            alert(error.message)
        }
    }

    render() {
        this._showHaveSeen()
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white',}}>This is HaveSeen Page</Text>
                </View>
                <View style={styles.flex_2}>


                    {/* <HaveSeenDetail /> */}

                </View>
                <View style={styles.flex_3}>

                </View>
                

                
                <Text style={{ textAlign:'center', color: 'white',}}>Swipe right to close</Text>
            </View>
        )
    }
}


class HaveSeenDetail extends Component {
    render () {
        return (
            <TouchableOpacity style={styles.items}>
                <View style={{flex:4, alignSelf: 'center'}}>
                    <Text style={{fontWeight:'600', marginLeft: 5}}>TITLE (years) </Text>
                </View>
                <View style={{flex:1, alignSelf: 'center'}}>
                    <Text> Rating</Text>
                </View>
            </TouchableOpacity>
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