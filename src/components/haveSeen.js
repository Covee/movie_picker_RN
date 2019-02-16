import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';

import { Font } from 'expo';


export default class HaveSeen extends Component {
    constructor(props) {
		super(props);
		this.state = {
            arrM: [],
            isReady: false,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'HM': require('../../assets/fonts/BM.ttf'),
            'Nixgon': require('../../assets/fonts/NIXGON.ttf'),
            'Nanum': require('../../assets/fonts/NanumBarunGothic.ttf'),
            'UhBee': require('../../assets/fonts/UhBee.ttf'),
            'NB': require('../../assets/fonts/NB.ttf'),
            'NR': require('../../assets/fonts/NR.ttf'),
        });
        this.setState({ isReady: true });
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
        console.log("선택>>>" + id)
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
        if (this.state.isReady == true) {
        this._showHaveSeen()
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white', fontFamily: 'NB'}}>이미 본 영화</Text>
                </View>
                <View style={styles.flex_2}>
                    <ScrollView style={styles.flex_2_scroll}>

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

                    </ScrollView>
                </View>

                <View style={styles.flex_3}>
                    <Text style={{ textAlign:'center', color: 'white', fontFamily: 'NR'}}>Swipe Right to close</Text>
                </View>
                
            </View>
        )
    } else {
        return <View><Text>Loading...</Text></View>;
      }
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
                    <Text style={{
                        marginLeft: 5, 
                        color: '#fbf9fa', 
                        fontSize: 15,
                        fontFamily: 'NB',
                    }}>
                        {this.props.title} ({this.props.year})
                    </Text>
                </View>
                <View style={{flex:1, alignSelf: 'center'}}>
                    <Text style={{
                        color: '#fbf9fa',
                        fontSize: 14,
                        fontFamily: 'NR',
                    }}>
                         평점: {this.props.rating}
                    </Text>
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
            flex: 2,
            justifyContent: 'center',
            paddingBottom: 5,
        },
        flex_2: {
            flex: 12,
            backgroundColor: 'transparent',
            },
            flex_2_scroll: {
                flex: 1,
                },
                items: {
                    flexDirection:'row',
                    backgroundColor: '#1abb9c',
                    borderRadius: 10,
                    width: '95%',
                    height: 40,
                    alignSelf: 'center',
                    marginTop: 5,
                },
        flex_3: {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: -5,
        },
})