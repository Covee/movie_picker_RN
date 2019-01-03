import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, ListItem} from 'react-native-elements'

import Modal from "react-native-modal";



export default class HaveSeen extends Component {
    constructor(props) {
		super(props);
		this.state = {
            title: null,
            year: null,
            rating: null,
        };
    }

    _showHaveSeen = async () => {
        let ids = this.props.haveSeenId
        try {
            idArr = []
            for(i=0; i<ids.length; i++) {
                fetch(mainURL + 'movie/' + ids[i][0] + '?api_key=' + API_KEY + '&language=ko-KR')
                .then(response => response.json())
                .then(json => {
                    idArr.push([[json.title],[json.release_date],[json.vote_average]])
                })
            }

            this.setState({
                title: idArr[0][0],
                year: idArr[0][1],
                rating: idArr[0][2],
            })

            console.log("제목: " +this.state.title + " (" + this.state.year + ") 평점:" + this.state.rating)
            
        } catch(error) {
            alert(error)
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