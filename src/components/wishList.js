import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage, Alert } from 'react-native';


export default class WishList extends Component {
    constructor(props) {
		super(props);
		this.state = {
            arrM: [],
        };
    }

    _showWishList = async () => {
        let ids = await AsyncStorage.getItem('idW')
        let titles = await AsyncStorage.getItem('titleW')
        let years = await AsyncStorage.getItem('yearW')
        let ratings = await AsyncStorage.getItem('ratingW')
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

    _deleteWishList = async(id) => {
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
        
                let ids = await AsyncStorage.getItem('idW')
                let titles = await AsyncStorage.getItem('titleW')
                let years = await AsyncStorage.getItem('yearW')
                let ratings = await AsyncStorage.getItem('ratingW')
                let arrIds = JSON.parse(ids)
                let arrTitles = JSON.parse(titles)
                let arrYears = JSON.parse(years)
                let arrRatings = JSON.parse(ratings)
        
                arrIds.splice(findIndex, 1)
                arrTitles.splice(findIndex, 1)
                arrYears.splice(findIndex, 1)
                arrRatings.splice(findIndex, 1)

                await AsyncStorage.removeItem('idW')
                await AsyncStorage.removeItem('titleW')
                await AsyncStorage.removeItem('yearW')
                await AsyncStorage.removeItem('ratingW')
                // await AsyncStorage.clear()  이건 데이터 전체 지우는 코드

                await AsyncStorage.setItem('idW', JSON.stringify(arrIds))
                await AsyncStorage.setItem('titleW', JSON.stringify(arrTitles))
                await AsyncStorage.setItem('yearW', JSON.stringify(arrYears))
                await AsyncStorage.setItem('ratingW', JSON.stringify(arrRatings))
        
                ids = await AsyncStorage.getItem('idW')
                titles = await AsyncStorage.getItem('titleW')
                years = await AsyncStorage.getItem('yearW')
                ratings = await AsyncStorage.getItem('ratingW')
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
        this._showWishList()
        return (
            <View style={styles.container}>
                <View style={styles.flex_1}>
                    <Text style={{fontSize:24, textAlign:'center', color: 'white',}}>Wish List</Text>
                </View>
                <View style={styles.flex_2}>
                    <ScrollView style={styles.flex_2_scroll}>

                    {
                        this.state.arrM.map((index) => {
                            return(
                                <WishListDetail 
                                    id={index[0]}
                                    title={index[1]}
                                    year={index[2]}
                                    rating={index[3]}
                                    arrM={this.state.arrM}
                                    delete={this._deleteWishList.bind(this)}
                                    select={this.props.select.bind(this)}
                                />
                            )
                        })
                    }

                    </ScrollView>
                </View>
                <View style={styles.flex_3}>

                </View>
                
                <Text style={{ textAlign:'center', color: 'white',}}>Swipe down to close</Text>
            </View>
        )
    }
}


class WishListDetail extends Component {
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
                        fontWeight:'600', 
                        marginLeft: 5, 
                        color: '#fbf9fa', 
                        fontSize: 15
                    }}>
                        {this.props.title} ({this.props.year})
                    </Text>
                </View>
                <View style={{flex:1, alignSelf: 'center'}}>
                    <Text style={{
                        color: '#fbf9fa',
                        fontSize: 14,
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
            justifyContent: 'flex-end',
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
                    backgroundColor: '#a80038',
                    borderRadius: 10,
                    width: '95%',
                    height: 40,
                    alignSelf: 'center',
                    marginTop: 5,
                },
        flex_3: {
            flex: 1,
        },
})