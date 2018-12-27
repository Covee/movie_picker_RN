import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Alert } from 'react-native';
import Filter from './filter';

import CardFlip from 'react-native-card-flip';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";


const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"

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
            randNumA: null,
            randNumB: Math.floor(Math.random() * 19),
        }
    }

    _filter() {

        fetch ('https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b&language=ko-KR&with_original_language='+ this.state.country +'&page=').then(response => response.json())
        .then(json => {
            this.setState({
                randNumA: Math.floor((Math.random() * json.total_pages))
            })
        })
        .then(
            fetch ('https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b&language=ko-KR&with_original_language=' + this.state.country + '&page=' + this.state.randNumA).then(response => response.json())
            .then(json => {
                this.setState({
                    pickedId: json.results[this.state.randNumB].id
                })
            })
        )
        .then(
            fetch(mainURL + 'movie/' + this.state.pickedId + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())
            .then(json => {
                if (!json.title || !json.poster_path) {
                    console.log("mix again")
                    this._filter()
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
                        country: json.original_language,
                    })
                }
            })
        )
    }

    componentDidMount() {
        // let page = 1;
        // let ratingAbove, genreId = null;
        let data = fetch(mainURL + 'movie/' + this.state.random + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())
        .then(json => {
            
          this.setState({
            isLoaded: true,
            title: json.title,
            year: json.release_date,
            rating: json.vote_average,
            runtime: json.runtime,
            income: json.revenue,
            story: json.overview,
            poster: json.poster_path,
            country: json.original_language,
          })
        })
        
    }

    // _filter(lang) {
    //     // if (this.state.country == 'ko'){
    //     //     Alert.alert(this.state.country)
    //     //     this.setState({country: 'en'})
    //     // } else {
    //     //     this.setState({country: 'en'})
    //     // }
    //     // this.setState({country: 'en'})
    //     console.log(lang)
    //     fetch ('https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b&language=ko-KR&with_original_language=' + lang).then(response => response.json())
    //     .then(json => {
    //         this.setState({
    //         //   isLoaded: true,
    //         //   title: json.title,
    //         //   year: json.release_date,
    //         //   rating: json.vote_average,
    //         //   runtime: json.runtime,
    //         //   income: json.revenue,
    //         //   story: json.overview,
    //           poster: json.results[0].poster_path,
    //           country: json.results[0].original_language,
    //         })
    //         console.log(this.state.country + "1")

    //       })
    //     console.log(this.state.country + "2")
    // }
        

    // let plain = fetch(mainURL + 'discover/movie?api_key=' + API_KEY + '&language=ko-KR&page=' + page + '&vote_average.gte=' + ratingAbove + '&with_genres=' + genreId + '&with_original_language=' + this.state.country).then(response => response.json())

    // let data = fetch(mainURL + 'movie/' + this.state.random + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())


    //     let plain = fetch(mainURL + 'discover/movie?api_key=' + API_KEY + '&language=ko-KR&page=' + page + '&vote_average.gte=' + ratingAbove + '&with_genres=' + genreId + '&with_original_language=' + country).then(response => response.json())
    //     .then(json => {
    //       this.setState({
    //         isLoaded: true,
    //         title: json.title,
    //         year: json.release_date,
    //         rating: json.vote_average,
    //         runtime: json.runtime,
    //         income: json.revenue,
    //         story: json.overview,
    //         poster: json.poster_path,
    //       })
    //     })
    // }

    render() {
        const { title, year, rating, runtime, income, story, poster } = this.state;
        
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
                                <Text>{title}[{year}]</Text>
                                <Text>평점: {rating}</Text>
                            </View>
                            <View style={styles.box2}>
                                <Text>상영시간: {runtime}분</Text>
                                <Text>수입: $ {income}</Text>
                            </View>
                            <View style={styles.box3}>
                                <Text>Castings</Text>
                            </View>
                            <View style={styles.box4}>
                                <Text>줄거리</Text>
                                <Text>{story}</Text>
                            </View>
                            <View style={styles.box5}>
                                <Text>Videos</Text>
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
                            <Icon name="ios-heart" style={styles.actionButtonIcon2} />
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
                            <ActionButton.Item buttonColor='#ff3881' title="All Tasks" onPress={() => {Alert.alert("dfdfd")}}>
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
                marginBottom: 10,
            },
            box2: {
                flex: 2,
                backgroundColor: 'white',
                marginBottom: 10,
            },
            box3: {
                flex: 3,
                backgroundColor: 'white',
                marginBottom: 10,
            },
            box4: {
                flex: 3,
                backgroundColor: 'white',
                marginBottom: 10,
            },
            box5: {
                flex: 3,
                backgroundColor: 'white',
                marginBottom: 10,
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
