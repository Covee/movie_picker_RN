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
            arrM: [],
        };
    }


    _showHaveSeen = async () => {
        let ids = await AsyncStorage.getItem('id')
        let titles = await AsyncStorage.getItem('title')
        let years = await AsyncStorage.getItem('year')
        let ratings = await AsyncStorage.getItem('rating')
        let arrIds = JSON.parse(ids)
        let arrTitles = JSON.parse(titles)
        let arrYears = JSON.parse(years)
        let arrRatings = JSON.parse(ratings)
        let arrM = []

        try {
            for(i=0; i<arrIds.length; i++) {
                // console.log("ID>>>>" + arrIds[i])
                arrM.push([arrIds[i],arrTitles[i],arrYears[i],arrRatings[i]])
            }
            this.setState({
                arrM: arrM
            })
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

                    {
                        this.state.arrM.map((index) => {
                            return(
                                <HaveSeenDetail 
                                    title={index[1]}
                                    year={index[2]}
                                    rating={index[3]}
                                />
                            )
                        })
                    }

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
                    <Text style={{fontWeight:'600', marginLeft: 5}}>{this.props.title} ({this.props.year}) </Text>
                </View>
                <View style={{flex:1, alignSelf: 'center'}}>
                    <Text> 평점: {this.props.rating}</Text>
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