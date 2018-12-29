import React, { Component } from 'react';
import { 
        StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput,
        TouchableHighlight, Image, Alert 
    } from 'react-native';
import { Card, ListItem, Button} from 'react-native-elements'
import Filter from './filter';
import Cards from './card';


import CardFlip from 'react-native-card-flip';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b"


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            category: null,
            random: 434119,
            title: null,
            year: null,
            rating: null,
            runtime: null,
            income: null,
            story: null,
            country: 'ko',
            isVisible: false,
            pickedId: null,
            randNumA: 217,
            randNumB: null,
            genre: null,
            cast: [],
            castImage: [],
            castChar: [],
        }
    }

    _filter() {
        fetch (discoverURL + '&language=ko-KR&with_original_language='+ this.state.country +'&page=').then(response => response.json())
        .then(json => {
            this.setState({
                randNumA: Math.ceil(Math.random() * (this.state.randNumA)),
                randNumB: Math.floor(Math.random() * 20),
            })
        })
        .then(
            fetch (discoverURL + '&language=ko-KR&with_original_language=' + this.state.country + '&page=' + this.state.randNumA).then(response => response.json())
            .then(json => {
                let id = json.results[this.state.randNumB].id
                this.setState({
                    pickedId: id,
                })
                console.log("page=" + this.state.randNumA, "arrayNum=" + this.state.randNumB, "ID=" + this.state.pickedId)
            })
        )
        .then(
            fetch(mainURL + 'movie/' + this.state.pickedId + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())
            .then(json => {
                if (!json.title || !json.poster_path || (json.genres[0]==undefined) ) {
                    console.log("no title || poster : mix again")
                    this._filter()
                } else {
                    if (json.genres[1]) {
                        this.setState({
                            isLoaded: true,
                            title: json.title,
                            year: json.release_date,
                            rating: json.vote_average,
                            runtime: json.runtime,
                            income: json.revenue,
                            story: json.overview,
                            poster: json.poster_path,
                            genre: [json.genres[0].name + ", " + json.genres[1].name],
                        })  
                    } else {
                        this.setState({
                            isLoaded: true,
                            title: json.title,
                            year: json.release_date,
                            rating: json.vote_average,
                            runtime: json.runtime,
                            income: json.revenue,
                            story: json.overview,
                            poster: json.poster_path,
                            genre: json.genres[0].name,
                        })
                    }
                    
                }
                if (this.state.country == 'ko') {
                    this.setState({randNumA: Math.floor(Math.random() * 217)+1})
                } else {
                    this.setState({randNumA: Math.floor(Math.random() * 1000)+1})
                }
            })
            
        )
        .then(
            this._cast()
        )
        
    }

    _cast = () => {
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];

        fetch(mainURL + 'movie/' + this.state.pickedId + '/credits?api_key=' + API_KEY + '&language=ko-KR')
        .then(response => response.json()
            .then(json => {
                if (json.cast[0].name) {
                    for (let i = 0; i < json.cast.length; i++) {
                    
                        arr1.push([json.cast[i].name])
                        arr2.push([json.cast[i].profile_path]),
                        arr3.push([json.cast[i].character])
                        // arr.push([json.cast[i].profile_path, json.cast[i].character, json.cast[i].name])
                    }
                    // for () {
                        if (json.cast[0] == null) {
                            this.setState({
                                cast: ['없음'],
                                // castImage: [arr2[0], arr2[1]],
                            })
                        } else {
                            this.setState({
                                cast: [arr1[0], arr1[1], arr1[2], arr1[3], arr1[4]],
                                castImage: [arr2[0], arr2[1], arr2[2], arr2[3], arr2[4]],
                                castChar: [arr3[0], arr3[1], arr3[2], arr3[3], arr3[4]], 
                            })
                        }


                        // console.log(this.state.castImage)
                    // }
                    

                    // console.log("cast>>> " + json.cast[i].profile_path)
                }
        
                
            })
        )
    }

    _changeCountry = (e) => {
        if (this.state.country == 'ko') {
            this.setState({country: 'en', randNumA: Math.floor(Math.random() * 1000)+1})
        } 
        // else if (this.state.country == '') {
        //     this.setState({country: 'en', randNumA: Math.floor(Math.random() * 1000)+1})
        // }
        else {
            this.setState({country: 'ko', randNumA: Math.floor(Math.random() * 217)+1})
        }
        
        // console.log(this.state.country)
        // this._filter()
    }

    // _log = () => {
    //     console.log(this.state.country)
    // }


    componentDidMount() {
        // let data = fetch(mainURL + 'movie/' + this.state.random + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())
        // .then(json => {
            
        //   this.setState({
        //     isLoaded: true,
        //     title: json.title,
        //     year: json.release_date,
        //     rating: json.vote_average,
        //     runtime: json.runtime,
        //     income: json.revenue,
        //     story: json.overview,
        //     poster: json.poster_path,
        //     country: json.original_language,
        //   })
        // })
        this._filter()
        
    }

    
    render() {
        
        const { title, year, rating, runtime, income, story, poster, genre, cast, castImage, castChar } = this.state;
        return (
            <View style={styles.container}>

                {/* AD */}
                <View style={styles.adBox}>
                    <View>
                        <Text>AD</Text>
                    </View>
                </View>

                {/* CARD */}
                <View style={styles.cardBox}>
                    <CardFlip duration = {800} style={styles.cardBox2} ref={(card) => this.card = card}>
                        
                        <TouchableOpacity 
                            style={styles.cardBox3}
                            activeOpacity= {1}
                            onPress={() => this.card.flip()}
                        >
                            {/* <View style={styles.posterBox}> */}
                                <Image
                                    source={{uri: ImageURL + poster}}
                                    style={{flex: 1, borderRadius: 15,}}
                                />
                            {/* </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.cardBox3}
                            activeOpacity= {1}
                            onPress={() => this.card.flip()}
                        >
                            <View style={styles.box1}>
                                <View style={styles.box1_in1}>
                                    <Text style={{fontSize:25, fontWeight:'700'}}>{title}</Text>
                                </View>
                                <View style={styles.box1_in2}>
                                        <Image 
                                            source={require('../images/star.png')} style={{width:30, height:30,}}>
                                        </Image>
                                    <Text style={{fontSize: 21, fontWeight:'600', alignSelf: 'center', marginTop: 1,}}> {rating}</Text>
                                </View>
                            </View>
                            <View style={styles.box2}>
                                <View style={styles.box2_in1}>
                                    <Text style={{}}>개봉일: [{year}]</Text>
                                    <Text>상영시간: {runtime}분</Text>
                                </View>
                                <View style={styles.box2_in2}>
                                    <Text>장르: {genre}</Text>
                                    <Text>수입: $ {income}</Text>
                                </View>
                            </View>
                            <View style={styles.box3}>
                                <View style={styles.box3_in1}>
                                    <Text style={{fontSize:17, fontWeight:'600'}}>출연진</Text>
                                </View>

        <ScrollView 
                horizontal={true} style={styles.box3_in2}
                contentContainerStyle={{alignItems: 'center'}}    
            >
                <TouchableOpacity activeOpacity= {1}>
                    <View style={{flex:1, flexDirection:'row'}}>
                    
                        {/* <Cards id={this.state.pickedId} /> */}

                        <Card
                            containerStyle={{height:'100%'}}
                            image={{uri: ImageURL + '/' + castImage[0]}}
                            imageStyle={{height:'73%',}}
                            // title={cast[0]}
                        >
                            <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                                [{castChar[0]}] 역
                            </Text>
                            <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                                {cast[0]}
                            </Text>
                        </Card>
                        <Card
                            containerStyle={{height:'100%'}}
                            image={{uri: ImageURL + '/' + castImage[1]}}
                            imageStyle={{height:'73%',}}
                            // title={cast[1]}
                        >
                            <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                                [{castChar[1]}] 역
                            </Text>
                            <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                                {cast[1]}
                            </Text>
                        </Card>
                        <Card
                            containerStyle={{height:'100%'}}
                            image={{uri: ImageURL + '/' + castImage[2]}}
                            imageStyle={{height:'73%',}}
                            // title={cast[2]}
                        >
                            <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                                [{castChar[2]}] 역
                            </Text>
                            <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                                {cast[2]}
                            </Text>
                        </Card>
                        <Card
                            containerStyle={{height:'100%'}}
                            image={{uri: ImageURL + '/' + castImage[3]}}
                            imageStyle={{height:'73%',}}
                            // title={cast[2]}
                        >
                            <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                                [{castChar[3]}] 역
                            </Text>
                            <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                                {cast[3]}
                            </Text>
                        </Card>
                        <Card
                            containerStyle={{height:'100%'}}
                            image={{uri: ImageURL + '/' + castImage[4]}}
                            imageStyle={{height:'73%',}}
                            // title={cast[2]}
                        >
                            <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                                [{castChar[4]}] 역
                            </Text>
                            <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}>
                                {cast[4]}
                            </Text>
                        </Card>

                    </View>
                </TouchableOpacity>
            </ScrollView>
                                
                            </View>

                            <View style={styles.box4}>
                                <ScrollView style={styles.box4}>
                                    <Text style={{fontSize:17, fontWeight:'600'}}>줄거리</Text>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                        activeOpacity= {1}
                                    >
                                        <Text style={{height: '100%', width: '100%', paddingLeft: -1, paddingRight: 2, paddingTop: 4,}}>{story}</Text>
                                    </TouchableOpacity>     
                                </ScrollView>
                            </View>

                            <View style={styles.box5}>
                                <Text style={{fontSize:17, fontWeight:'600'}}>비디오</Text>
                            </View>
                        </TouchableOpacity>
                    </CardFlip>
                </View>
                


                {/* BUTTONS */}
                <View style={styles.buttonBox}>
                    {/* <View style={{alignContent:'flex-end'}}> */}
                        <TouchableOpacity 
                            style={styles.buttonMix}
                            onPress={() => {this._filter()}}    
                        >
                            <Icon name="ios-shuffle" style={styles.actionButtonIcon2} />
                        </TouchableOpacity>
                    {/* </View> */}
                    <View style={styles.buttonFilter}>
                        {/*Rest of App come ABOVE the action button component!*/}
                        <ActionButton buttonColor="rgba(231,76,60,1)" radius={90} outRangeScale={0.7} degrees={405} position={'right'}>

                            <ActionButton.Item 
                                buttonColor='#9b59b6' 
                                title="New Task" 
                                onPress={() => this.setState({isVisible: true}) }
                            >
                                
                                <Icon name="ios-funnel" style={styles.actionButtonIcon} />
                                
                            </ActionButton.Item>
                            <ActionButton.Item 
                                buttonColor='#ff3881' 
                                title="All Tasks" 
                                onPress={(e) => this._changeCountry()}
                            >
                                <Icon name="ios-heart" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {Alert.alert("dfdfd")}}>
                                <Icon name="ios-eye" style={styles.actionButtonIcon} />
                                
                            </ActionButton.Item>                            
                            <ActionButton.Item buttonColor='gray' title="All Tasks" onPress={() => {Alert.alert("dfdfd")}}>
                                <Icon name="ios-settings" style={styles.actionButtonIcon} />
                            </ActionButton.Item>

                        </ActionButton>
                    </View>

                    <View>
                        <Modal 
                            isVisible={this.state.isVisible}
                            onSwipe={() => this.setState({ isVisible: false })}
                            swipeDirection="right"
                        >
                            <View style={{ flex: 1, justifyContent:'center'}}>
                                <Text style={{ textAlign:'center', color: 'white',}}>Swipe right to close</Text>
                            </View>
                        </Modal>
                    </View>
                    

                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  adBox: {
    flex: 1,
    backgroundColor: 'red',
    },

  cardBox: {
    flex: 6,
    backgroundColor: '#fffcfd',
    position: 'relative',
    },
    cardBox2: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        },
        cardBox3: {
            flex: 1,
            width: '100%',
            alignSelf: 'center',
            // marginTop: 5,
            backgroundColor: 'lightblue',
            borderRadius: 15,
            shadowOffset: { width: 4, height: 5 },
            shadowOpacity: 0.8,
            shadowRadius: 2,

            },
            posterBox: {
                flex: 1,
                backgroundColor: 'white',
            },
            box1: {
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'white',
                marginBottom: 5,
                alignItems: 'center',
                },
                box1_in1: {
                    flex: 4,
                },
                box1_in2: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingRight: 2,
                },
            box2: {
                flex: 1.3,
                backgroundColor: 'white',
                marginBottom: 5,
                flexDirection: 'row'
                },
                box2_in1: {
                    flex: 1,
                },
                box2_in2: {
                    flex: 1,
                },
            box3: {
                flex: 6,
                backgroundColor: 'white',
                marginBottom: 5,
                flexDirection: 'column',
                },
                box3_in1: {

                },
                box3_in2: {
                    flexDirection: 'row', 
                    marginBottom: 5, 
                    marginLeft: -10,
                    // backgroundColor: 'green',
                    marginTop: -13,
                    
                },
            box4: {
                flex: 3,
                backgroundColor: 'white',
                marginBottom: 5,
                // elevation: 5,
                // zIndex: 2000,
            },
            box5: {
                flex: 3,
                backgroundColor: 'white',
                marginBottom: 5,
            },

  buttonBox: {
    flex: 1.4,
    backgroundColor: '#fffcfd',
    // backgroundColor: '#0061ff',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    // zIndex: 2000,
    },
    buttonMix: {
        flex: 1,
        backgroundColor: '#1abc9c',
        borderColor: '#1abc9c',
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        alignSelf: 'flex-end',
        alignItems: 'center', 
        position: 'relative',
        marginLeft: 20,
        marginBottom: 15
    },
    buttonFilter: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 2,
        marginRight: 5,
        
    },
    buttonBurger: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center'

    },
    actionButtonIcon: {
        fontSize: 25.5,
        height: 23,
        color: 'white',
        marginBottom: 5
      },


      actionButtonIcon2: {
        fontSize: 35,
        height: 32,
        color: 'white',
        marginBottom: 5,
      },

});
