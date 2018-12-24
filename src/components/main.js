import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import CardFlip from 'react-native-card-flip';
// import CircleMenu from '@ramotion/react-native-circle-menu'


const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"

// class Filter extends Component {
//     state = {

//     }
// }


export default class Main extends Component {
    state = {
        isLoaded: false,
        error: null,
        category: 'top_rated',
        latest: 'latest',
        random: 338952,
        title: null,
        year: null,
        rating: null,
        runtime: null,
        income: null,
        story: null,
        
    }
    _randomNumber = () => {
        const min = 1;
        const recent = fetch(mainURL + 'movie/' + this.state.latest + '?api_key=' + API_KEY + '&language=ko-KR')
        const max = this.setState({latest: recent.state.latest})
        const random = min + Math.random() * (max - min);
        this.setState({ random: this.state.random + random });     
    }

    componentDidMount() {
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
          })
        })
    }
    _getMovie = () => {
        const { } = this.state;
    }

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
                    <CardFlip duration = {1000} style={styles.cardBox2} ref={(card) => this.card = card}>
                        <TouchableOpacity 
                            style={styles.cardBox3}
                            activeOpacity= {1}
                            onPress={() => this.card.flip()}
                        >
                            {/* <View style={styles.posterBox}> */}
                                <Image
                                    source={{uri: ImageURL + poster}}
                                    style={{width:'auto', height:570}}
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
                    <TouchableOpacity style={styles.buttonMix}>
                        <Text>추천</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonBurger}>
                        <Text>Hamburger</Text>
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
    backgroundColor: 'green',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    },
    buttonMix: {
        flex: 2,
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',     
    },
    buttonBurger: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center'

    },

});
