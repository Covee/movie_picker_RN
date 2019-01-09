import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';
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
            console.log(error.message)
        }
    }

    _deleteHaveSeen = async(id) => {
        
        Alert.alert(
            this.props.title,
            '목록에서 제거하시겠습니까?',
            [
              {text: '제거', onPress: async () => {
                let num = this.state.arrM
                let abc = []
                for(i=0; i<num.length; i++){
                    abc.push(num[i][0])
                }
                let findIndex = abc.indexOf(id)
                // console.log(findIndex)
        
                let ids = await AsyncStorage.getItem('id')
                let titles = await AsyncStorage.getItem('title')
                let years = await AsyncStorage.getItem('year')
                let ratings = await AsyncStorage.getItem('rating')
                let arrIds = JSON.parse(ids)
                let arrTitles = JSON.parse(titles)
                let arrYears = JSON.parse(years)
                let arrRatings = JSON.parse(ratings)
        
                arrIds.splice(findIndex, 1)
                arrTitles.splice(findIndex, 1)
                arrYears.splice(findIndex, 1)
                arrRatings.splice(findIndex, 1)

                await AsyncStorage.removeItem('id')
                await AsyncStorage.removeItem('title')
                await AsyncStorage.removeItem('year')
                await AsyncStorage.removeItem('rating')
                // await AsyncStorage.clear()  이건 데이터 전체 지우는 코드

                await AsyncStorage.setItem('id', JSON.stringify(arrIds))
                await AsyncStorage.setItem('title', JSON.stringify(arrTitles))
                await AsyncStorage.setItem('year', JSON.stringify(arrYears))
                await AsyncStorage.setItem('rating', JSON.stringify(arrRatings))
        
                ids = await AsyncStorage.getItem('id')
                titles = await AsyncStorage.getItem('title')
                years = await AsyncStorage.getItem('year')
                ratings = await AsyncStorage.getItem('rating')
                arrIds = JSON.parse(ids)
                arrTitles = JSON.parse(titles)
                arrYears = JSON.parse(years)
                arrRatings = JSON.parse(ratings)
                arrM = []
        
                try {
                    for(i=0; i<arrIds.length; i++) {
                        arrM.push([arrIds[i],arrTitles[i],arrYears[i],arrRatings[i]])
                    }
                    this.setState({
                        arrM: arrM
                    })
                } catch(error) {
                    console.log(error.message)
                }
                Alert.alert("제거했습니다.")
                // let test1 = await AsyncStorage.getItem('id')
                // let testa = JSON.parse(test1)
                // console.log("값>>" + testa)
              }},
              {text: '취소', onPress: () => console.log('그대로'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    }


    render() {
        this._showHaveSeen()
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white',}}>HaveSeen List</Text>
                </View>
                <View style={styles.flex_2}>

                    {
                        this.state.arrM.map((index) => {
                            return(
                                <HaveSeenDetail 
                                    id={index[0]}
                                    title={index[1]}
                                    year={index[2]}
                                    rating={index[3]}
                                    arrM={this.state.arrM}
                                    delete={this._deleteHaveSeen.bind(this)}
                                    select={this.props.select.bind(this)}
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
    constructor(props) {
		super(props);
		this.state = {
            arrM: this.props.arrM,
        };
    }

    render () {
        return (
            <TouchableOpacity 
                style={styles.items}
                onLongPress={() => this.props.delete(this.props.id)}
                onPress={() => this.props.select(this.props.id)}
                >
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