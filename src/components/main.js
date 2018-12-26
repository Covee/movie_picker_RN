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
            error: '',
            category: null,
            latest: 'latest',
            random: 434119,
            title: null,
            year: null,
            rating: null,
            runtime: null,
            income: null,
            story: null,
            country: null,
            isVisible: false,
        }
    }
    
    _filterFunction = () => {
        <Modal isVisible={true}>
            <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
            </View>
        </Modal>
    }

    _randomNumber = () => {
        const min = 1;
        const recent = fetch(mainURL + 'movie/' + this.state.latest + '?api_key=' + API_KEY + '&language=ko-KR')
        const max = this.setState({latest: recent.state.latest})
        const random = min + Math.random() * (max - min);
        this.setState({ random: this.state.random + random });     
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
                                    style={{flex: 1}}
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
                    <TouchableOpacity 
                        style={styles.buttonMix}
                        // onPress={}    
                    >
                        <Text>추천</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonFilter}>
                        {/*Rest of App come ABOVE the action button component!*/}
                        <ActionButton buttonColor="rgba(231,76,60,1)" radius={110} outRangeScale={1.4} degrees={300} position={'right'}>

                            <ActionButton.Item 
                                buttonColor='#9b59b6' 
                                title="New Task" 
                                onPress={() => this.setState({isVisible: true}) } >
                                
                                <Icon name="ios-funnel" style={styles.actionButtonIcon} />
                                
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#ff3881' title="All Tasks" onPress={() => {}}>
                                <Icon name="ios-heart" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                                <Icon name="ios-eye" style={styles.actionButtonIcon} />
                                
                            </ActionButton.Item>                            
                            <ActionButton.Item buttonColor='gray' title="All Tasks" onPress={() => {}}>
                                <Icon name="ios-settings" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                        </ActionButton>
                    </View>

                    {/* <View style={styles.buttonBurger}>
                        <TouchableOpacity
                            // onPress={}
                        
                        >
                        <Text>Hamburger</Text>
                        </TouchableOpacity>
                    </View> */}
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
    backgroundColor: 'blue',
    },
    cardBox2: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        // backgroundColor: 'yellow',
        },
        cardBox3: {
            flex: 1,
            width: '100%',
            alignSelf: 'center',
            marginTop: 10,
            // paddingTop: 5,
            paddingBottom: 20,
            backgroundColor: 'lightblue',

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
    flex: 1,
    backgroundColor: '#daf7d7',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    },
    buttonMix: {
        flex: 2,
        backgroundColor: '#1abc9c',
        borderColor: '#1abc9c',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',     
    },
    buttonFilter: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    buttonBurger: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center'

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },

});
