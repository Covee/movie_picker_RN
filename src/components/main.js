import React, { Component } from 'react';
import { 
        StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput,
        TouchableHighlight, Image, Alert, AsyncStorage 
    } from 'react-native';
import { Card, ListItem, Button} from 'react-native-elements'
import Filter from './filter';
import Cards from './card';
import WishList from './wishList';
import HaveSeen from './haveSeen';
import Settings from './settings';

import CardFlip from 'react-native-card-flip';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

import { Font } from 'expo';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
  } from 'expo';

const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b"

// WISHLIST & HAVESEEN Function
let arrWishList = []
let seenTitlew = []
let seenYearw = []
let seenRatingw = []

let arrHaveSeen = []
let seenTitle = []
let seenYear = []
let seenRating = []

// FILTER GENRES
let genArr = []
let action1 = false
let adventure1 = false
let animation1 = false
let comedy1 = false
let crime1 = false
let documentary1 = false
let drama1 = false
let family1 = false
let fantasy1 = false
let history1 = false
let horror1 = false
let music1 = false
let mystery1 = false
let romance1 = false
let sf1 = false
let tvMovie1 = false
let thriller1 = false
let war1 = false
let western1 = false

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.changeCountry = this._changeCountry.bind(this)
        this.action = this._action.bind(this)
        this.adventure = this._adventure.bind(this)
        this.animation = this._animation.bind(this)
        this.comedy = this._comedy.bind(this)
        this.crime = this._crime.bind(this)
        this.documentary = this._documentary.bind(this)
        this.drama = this._drama.bind(this)
        this.family = this._family.bind(this)
        this.fantasy = this._fantasy.bind(this)
        this.history = this._history.bind(this)
        this.horror = this._horror.bind(this)
        this.music = this._music.bind(this)
        this.mystery = this._mystery.bind(this)
        this.romance = this._romance.bind(this)
        this.sf = this._sf.bind(this)
        this.tvMovie = this._tvMovie.bind(this)
        this.thriller = this._thriller.bind(this)
        this.war = this._war.bind(this)
        this.western = this._western.bind(this)

        
        this.state = {
            isLoaded: false,
            category: null,
            title: null,
            year: null,
            rating: null,
            runtime: null,
            income: null,
            story: null,
            country: 'ko',
            isVisibleFilter: false,
            isVisibleWishList: false,
            isVisibleHaveSeen: false,
            isVisibleSettings: false,
            pickedId: null,
            randNumA: 220,
            randNumB: null,
            genre: null,
            cast: [],
            castImage: [],
            castChar: [],
            HaveSeenId:[],
            WishListId:[],
            switch: false,
            genArr: null,
            isReady: false,
            upRating: '',
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'HM': require('../../assets/fonts/BM.ttf'),
            'Nixgon': require('../../assets/fonts/NIXGON.ttf'),
            'Nanum': require('../../assets/fonts/NanumBarunGothic.ttf'),
            'UhBee': require('../../assets/fonts/UhBee.ttf'),
            'Jeju': require('../../assets/fonts/JejuM.ttf'),
            'NB': require('../../assets/fonts/NB.ttf'),
            'NR': require('../../assets/fonts/NR.ttf'),
        });
        this.setState({ isReady: true });
    }

// EXECUTION   
    _filter = async () => {
        console.log("-----filter함수 시작됩니다----")
        await this.setState({
            randNumA: Math.ceil(Math.random() * (this.state.randNumA)),
            randNumB: Math.floor(Math.random() * 20),
            cast: [],
        })
        await this._changeGenre()
        // console.log("MAX pages >>> " + this.state.randNumA + "  genArr => " + this.state.genArr)
        console.log("rating>> " + this.state.upRating*0.1)
        await fetch (discoverURL + '&language=ko-KR&with_original_language=' + this.state.country + '&page=' + this.state.randNumA + '&vote_average.gte=' + (this.state.upRating*0.1) + '&with_genres=' + this.state.genArr).then(response => response.json())
            .then(json => {
                let id = json.results[this.state.randNumB].id
                this.setState({
                    pickedId: id,
                })
                console.log("randNumA=" + this.state.randNumA, "randNumB=" + this.state.randNumB, "pickedId=" + this.state.pickedId)

                fetch(mainURL + 'movie/' + this.state.pickedId + '?api_key=' + API_KEY + '&language=ko-KR')
                .then(response => response.json())
                .then(json => {
                    if (json.title==undefined || json.poster_path==undefined || json.genres[0]==undefined) {
                        // console.log("5>>if문 실행됨, filter함수 다시 call")
                        this._filter()
                    } else {
                        // console.log("6>>else문 실행됨")
                        if (json.genres[1]) {
                            this.setState({
                                isLoaded: true,
                                title: json.title,
                                year: json.release_date,
                                rating: json.vote_average * 10,
                                runtime: json.runtime,
                                income: json.revenue,
                                story: json.overview,
                                poster: json.poster_path,
                                genre: [json.genres[0].name + ", " + json.genres[1].name],
                                pickedId: json.id,
                            })
                            this._cast()
                        } else {
                            this.setState({
                                isLoaded: true,
                                title: json.title,
                                year: json.release_date,
                                rating: json.vote_average * 10,
                                runtime: json.runtime,
                                income: json.revenue,
                                story: json.overview,
                                poster: json.poster_path,
                                genre: json.genres[0].name,
                                pickedId: json.id,
                            })
                            this._cast()
                        }
                        
                    }
                    if (this.state.country == 'ko') {
                        this.setState({randNumA: Math.floor(Math.random() * 217)+1})
                    } else {
                        this.setState({randNumA: Math.floor(Math.random() * 1000)+1})
                    }
                })
            })

    }

    _cast = () => {
        let arr1 = [];
        // console.log("7>>_cast() 실행됨, pickedId" + this.state.pickedId)
        fetch(mainURL + 'movie/' + this.state.pickedId + '/credits?api_key=' + API_KEY + '&language=ko-KR')
        .then(response => response.json()
            .then(json => {
                if (json.cast[0].name != null) {
                    for (let i = 0; i < json.cast.length; i++) {
                        arr1.push([json.cast[i].name, json.cast[i].profile_path, json.cast[i].character])
                    }
                    let newArr = []
                    for (i=0; i < json.cast.length; i++){
                        newArr.push(arr1[i])
                    }
                    
                    this.setState({
                        cast: newArr
                    })
                } else {
                    console.log("cast가 null임")
                }
                        
            })
        )
    }



// FILTER OPTIONS

    _changeCountry = (e) => {
        if (this.state.country == 'ko') {
            this.setState({country: 'en', randNumA: Math.floor(Math.random() * 1000)+1, switch: true})
        } 
        // else if (this.state.country == '') {
        //     this.setState({country: 'en', randNumA: Math.floor(Math.random() * 1000)+1})
        // }
        else {
            this.setState({country: 'ko', randNumA: Math.floor(Math.random() * 217)+1, switch: false})
        }
    }

    _changeRating = async (cRate) => {
        await this.setState({
            upRating: cRate
        })
        console.log("바뀐 Rating>>> " + this.state.upRating)
        // 일단 바뀐 점수 main으로 받아오는건 성공. 여기서 데이타 핸들링.... 근데 너무 컴퓨터가 느려지네...
    }

    _changeGenre = async () => {
        let arrange = genArr.join('')
        this.setState({
            genArr: arrange
        })
        fetch(discoverURL + '&language=ko-KR&with_original_language=' + this.state.country + '&page=' + '&vote_average.gte=' + (this.state.upRating* (1/10)) + '&with_genres=' + this.state.genArr).then(response => response.json())
        .then(json => {
            console.log("토탈페이지>>>> " + json.total_pages)
            this.setState({
                randNumA: Math.floor(Math.random() * json.total_pages+1)
            })
            console.log("랜덤으로뽑은페이지>>>> " + this.state.randNumA)
        })
        
    }


    _action = () => {
        console.log("this is action")
        if(action1 == false){
            action1 = true
            genArr.push('28%7C')
        } else {
            action1 = false
            let index = genArr.indexOf('28%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _adventure = () => {
        console.log("this is adventure")
        if(adventure1 == false){
            adventure1 = true
            genArr.push('12%7C')
        } else {
            adventure1 = false
            let index = genArr.indexOf('12%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _animation = () => {
        console.log("this is animation")
        if(animation1 == false){
            animation1 = true
            genArr.push('16%7C')
        } else {
            animation1 = false
            let index = genArr.indexOf('16%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _comedy = () => {
        console.log("this is comedy")
        if(comedy1 == false){
            comedy1 = true
            genArr.push('35%7C')
        } else {
            comedy1 = false
            let index = genArr.indexOf('35%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _crime = () => {
        console.log("this is crime")
        if(crime1 == false){
            crime1 = true
            genArr.push('80%7C')
        } else {
            crime1 = false
            let index = genArr.indexOf('80%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _documentary = () => {
        console.log("this is documentary")
        if(documentary1 == false){
            documentary1 = true
            genArr.push('99%7C')
        } else {
            documentary1 = false
            let index = genArr.indexOf('99%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _drama = () => {
        console.log("this is drama")
        if(drama1 == false){
            drama1 = true
            genArr.push('18%7C')
        } else {
            drama1 = false
            let index = genArr.indexOf('18%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _family = () => {
        console.log("this is family")
        if(family1 == false){
            family1 = true
            genArr.push('10751%7C')
        } else {
            family1 = false
            let index = genArr.indexOf('10751%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _fantasy = () => {
        console.log("this is fantasy")
        if(fantasy1 == false){
            fantasy1 = true
            genArr.push('14%7C')
        } else {
            fantasy1 = false
            let index = genArr.indexOf('14%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _history = () => {
        console.log("this is history")
        if(history1 == false){
            history1 = true
            genArr.push('36%7C')
        } else {
            history1 = false
            let index = genArr.indexOf('36%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _horror = () => {
        console.log("this is horror")
        if(horror1 == false){
            horror1 = true
            genArr.push('27%7C')
        } else {
            horror1 = false
            let index = genArr.indexOf('27%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _music = () => {
        console.log("this is music")
        if(music1 == false){
            music1 = true
            genArr.push('10402%7C')
        } else {
            music1 = false
            let index = genArr.indexOf('10402%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _mystery = () => {
        console.log("this is mystery")
        if(mystery1 == false){
            mystery1 = true
            genArr.push('9648%7C')
        } else {
            mystery1 = false
            let index = genArr.indexOf('9648%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _romance = () => {
        console.log("this is romance")
        if(romance1 == false){
            romance1 = true
            genArr.push('10749%7C')
        } else {
            romance1 = false
            let index = genArr.indexOf('10749%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _sf = () => {
        console.log("this is sf")
        if(sf1 == false){
            sf1 = true
            genArr.push('878%7C')
        } else {
            sf1 = false
            let index = genArr.indexOf('878%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _tvMovie = () => {
        console.log("this is tvMovie")
        if(tvMovie1 == false){
            tvMovie1 = true
            genArr.push('10770%7C')
        } else {
            tvMovie1 = false
            let index = genArr.indexOf('10770%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _thriller = () => {
        console.log("this is thriller")
        if(thriller1 == false){
            thriller1 = true
            genArr.push('53%7C')
        } else {
            thriller1 = false
            let index = genArr.indexOf('53%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _war = () => {
        console.log("this is war")
        if(war1 == false){
            war1 = true
            genArr.push('10752%7C')
        } else {
            war1 = false
            let index = genArr.indexOf('10752%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }

    _western = () => {
        console.log("this is western")
        if(western1 == false){
            western1 = true
            genArr.push('37%7C')
        } else {
            western1 = false
            let index = genArr.indexOf('37%7C')
            genArr.splice(index, 1)
        }
        this.setState({ randNumA: 1})
        console.log("genArr >>> " + genArr)
    }


// WishList & HaveSeen
    async _wishList() {
        arrWishList = await AsyncStorage.getItem('idW')
        seenTitlew = await AsyncStorage.getItem('titleW')
        seenYearw = await AsyncStorage.getItem('yearW')
        seenRatingw = await AsyncStorage.getItem('ratingW')

        if(arrWishList == null){
            arrWishList = [];
            seenTitlew = [];
            seenYearw = [];
            seenRatingw = [];

            arrWishList.push(this.state.pickedId)
            seenTitlew.push(this.state.title)
            seenYearw.push(this.state.year)
            seenRatingw.push(this.state.rating)

            Alert.alert("위시리스트에 추가되었습니다!")
            this._saveWishList()
        } else {
            arrWishList = JSON.parse(arrWishList)
            seenTitlew = JSON.parse(seenTitlew)
            seenYearw = JSON.parse(seenYearw)
            seenRatingw = JSON.parse(seenRatingw)

            let a = true

            if (arrWishList !== null){
                for(i=0; i<arrWishList.length; i++){
                    if (this.state.pickedId == arrWishList[i]) {
                        Alert.alert("이미 리스트에 추가되어 있습니다!")
                        a = false
                        break;
                    }
                }
            }
            
            if (a == true){
                arrWishList.push(this.state.pickedId)
                seenTitlew.push(this.state.title)
                seenYearw.push(this.state.year)
                seenRatingw.push(this.state.rating)
    
                Alert.alert("위시리스트에 추가되었습니다!")
                this._saveWishList()
            }
        }
    }

    _saveWishList = async () => {
        await AsyncStorage.setItem('idW', JSON.stringify(arrWishList))
        await AsyncStorage.setItem('titleW', JSON.stringify(seenTitlew))
        await AsyncStorage.setItem('yearW', JSON.stringify(seenYearw))
        await AsyncStorage.setItem('ratingW', JSON.stringify(seenRatingw))
    }

    _actionWishList = () => {
        this.setState({isVisibleWishList: true})
    }

    _selectWishList = (id) => {
        console.log("선택한 영화 나옵니다~~!! >> " + id)
        this.setState({
            pickedId: id
        })
        fetch(mainURL + 'movie/' + id + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())
        .then(json => {
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
                    // pickedId: id
                    isVisibleWishList: false,
                })
                this._cast()
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
                    // pickedId: id
                    isVisibleWishList: false,
                })
                this._cast()
            }
        })
    }




    async _haveSeen() {
        arrHaveSeen = await AsyncStorage.getItem('id')
        seenTitle = await AsyncStorage.getItem('title')
        seenYear = await AsyncStorage.getItem('year')
        seenRating = await AsyncStorage.getItem('rating')

        if(arrHaveSeen == null){
            arrHaveSeen = [];
            seenTitle = [];
            seenYear = [];
            seenRating = [];

            arrHaveSeen.push(this.state.pickedId)
            seenTitle.push(this.state.title)
            seenYear.push(this.state.year)
            seenRating.push(this.state.rating)

            Alert.alert("이미 본 영화 리스트에 추가되었습니다!")
            this._saveHaveSeen()
        } else {
            arrHaveSeen = JSON.parse(arrHaveSeen)
            seenTitle = JSON.parse(seenTitle)
            seenYear = JSON.parse(seenYear)
            seenRating = JSON.parse(seenRating)

            let a = true

            if (arrHaveSeen !== null){
                for(i=0; i<arrHaveSeen.length; i++){
                    if (this.state.pickedId == arrHaveSeen[i]) {
                        Alert.alert("이미 리스트에 추가되어 있습니다!")
                        a = false
                        break;
                    }
                }
            }
            
            if (a == true){
                arrHaveSeen.push(this.state.pickedId)
                seenTitle.push(this.state.title)
                seenYear.push(this.state.year)
                seenRating.push(this.state.rating)
    
                Alert.alert("이미 본 영화 리스트에 추가되었습니다!")
                this._saveHaveSeen()
            }
        }
    }

    _saveHaveSeen = async () => {
        await AsyncStorage.setItem('id', JSON.stringify(arrHaveSeen))
        await AsyncStorage.setItem('title', JSON.stringify(seenTitle))
        await AsyncStorage.setItem('year', JSON.stringify(seenYear))
        await AsyncStorage.setItem('rating', JSON.stringify(seenRating))
    }

    _actionHaveSeen = () => {
        this.setState({isVisibleHaveSeen: true})
    }

    _selectHaveSeen = (id) => {
        console.log("선택한 영화 나옵니다~~!! >> " + id)
        this.setState({
            pickedId: id
        })
        fetch(mainURL + 'movie/' + id + '?api_key=' + API_KEY + '&language=ko-KR').then(response => response.json())
        .then(json => {
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
                    // pickedId: id
                    isVisibleHaveSeen: false,
                })
                this._cast()
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
                    // pickedId: id
                    isVisibleHaveSeen: false,
                })
                this._cast()
            }
        })
    }


    componentWillMount() {
        this._filter()
    }
    
    render() {
        if (this.state.isReady == true) {
        const { 
            title, year, rating, runtime, income, story, poster, genre, cast, pickedId 
        } = this.state;
        return (
            <View style={styles.container}>

                {/* AD */}
                <View style={styles.adBox}>
                    <View style={{}}>
                        {/* <Text>pickedId: {pickedId}</Text> */}
                        <AdMobBanner
                            style={{}}
                            bannerSize="smartBanner"
                            adUnitID="ca-app-pub-3940256099942544/2934735716"
                            // Test ID, Replace with your-admob-unit-id
                            testDeviceID="EMULATOR"
                            didFailToReceiveAdWithError={this.bannerError}
                        />
                    </View>
                </View>

                {/* CARD */}
                <View style={styles.cardBox}>
                    <CardFlip duration={800} style={styles.cardBox2} ref={(card) => this.card = card}>
                        
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
                                    <Text style={{fontSize:25, fontFamily: 'NB'}}>{title}</Text>
                                </View>
                                <View style={styles.box1_in2}>
                                        <Image 
                                            source={require('../images/star.png')} style={{width:30, height:30,}}>
                                        </Image>
                                    <Text style={{fontSize: 21, alignSelf: 'center', marginTop: 1, fontFamily: 'NR'}}> {rating}점 </Text>
                                </View>
                            </View>
                            <View style={styles.box2}>
                                <View style={styles.box2_in1}>
                                    <Text style={{marginBottom: 5, fontFamily: 'NR'}}>개봉일: {year}</Text>
                                    <Text style={{fontFamily: 'NR'}}>상영시간: {runtime}분</Text>
                                </View>
                                <View style={styles.box2_in2}>
                                    <Text style={{marginBottom: 5, fontFamily: 'NR'}}>장르: {genre}</Text>
                                    <Text style={{fontFamily: 'NR'}}>수입: {income=='0' ? '집계되지 않음' : '$ '+income}</Text>
                                </View>
                            </View>
                            <View style={styles.box3}>
                                <View style={styles.box3_in1}>
                                    <Text style={{fontSize:18, fontFamily: 'NR'}}>출연진</Text>
                                </View>

                                <ScrollView 
                                    horizontal={true} style={styles.box3_in2}
                                    contentContainerStyle={{alignItems: 'center'}}    
                                >
                                    <TouchableOpacity activeOpacity= {1}>
                                        <View style={{flex:1, flexDirection:'row'}}>
                                            {
                                                cast.map((casts) => {
                                                    return (
                                                        <CardInfo 
                                                            name={casts[0]}
                                                            image={casts[1]}
                                                            char={casts[2]}
                                                        />
                                                    );
                                                })
                                            }

                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                                
                            </View>

                            <View style={styles.box4}>
                                <ScrollView style={styles.box4}>
                                    <Text style={{fontSize:18, marginBottom: -2, fontFamily: 'NR'}}>줄거리</Text>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                        activeOpacity= {1}
                                    >
                                        <Text style={{height: '100%', width: '100%', paddingLeft: -1, paddingRight: 2, paddingTop: 4, fontFamily: 'NR', fontSize: 14, }}>{story}</Text>
                                    </TouchableOpacity>     
                                </ScrollView>
                            </View>

                            <View style={styles.box6}>
                                    <View style={{flex:1}} />
                                <TouchableOpacity 
                                    style={styles.box6_wishlist}
                                    onPress={()=>this._wishList()}
                                >
                                    <Icon name="ios-heart" style={{fontSize:30, color:'#ff6473', fontWeight:'700', paddingTop: 5}} />
                                </TouchableOpacity>
                                    <View style={{flex:1}} />
                                <TouchableOpacity 
                                    style={styles.box6_haveseen}
                                    onPress={()=>this._haveSeen()}
                                >
                                    <Icon name="ios-eye" style={{fontSize:30, color:'#20c1bd', fontWeight:'700', paddingTop: 5}} />
                                </TouchableOpacity>
                                    <View style={{flex:1}} />
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
                        <ActionButton buttonColor="#a80038" radius={88} outRangeScale={0.74} degrees={405} position={'right'}>

                            <ActionButton.Item 
                                buttonColor='#9b59b6' 
                                title="New Task" 
                                onPress={() => this.setState({isVisibleFilter: true}) }
                            >  
                                <Icon name="ios-funnel" style={styles.actionButtonIcon} />
                                
                            </ActionButton.Item>

                            <ActionButton.Item 
                                buttonColor='#ff3881'
                                title="All Tasks" 
                                onPress={() =>this._actionWishList()}
                            >
                                <Icon name="ios-heart" style={styles.actionButtonIcon} />
                            </ActionButton.Item>

                            <ActionButton.Item 
                                buttonColor='#3498db' 
                                title="Notifications" 
                                onPress={() => 
                                    this._actionHaveSeen()
                                }
                            >
                                <Icon name="ios-eye" style={styles.actionButtonIcon} />
                                
                            </ActionButton.Item>    

                            <ActionButton.Item 
                                buttonColor='gray' 
                                title="All Tasks" 
                                onPress={() => 
                                    this.setState({isVisibleSettings: true})
                                }
                            >
                                <Icon name="ios-settings" style={styles.actionButtonIcon} />
                            </ActionButton.Item>

                        </ActionButton>
                    </View>



            {/* Modals */}
                    <View>
                        <Modal 
                            isVisible={this.state.isVisibleFilter}
                            onSwipe={() => this.setState({ isVisibleFilter: false })}
                            swipeDirection="down"
                        >
                            <Filter 
                                changeCountry={this.changeCountry}
                                changeRating={this._changeRating}
                                switch={this.state.switch}
                                action={this.action}
                                adventure={this.adventure}
                                animation={this.animation}
                                comedy={this.comedy}
                                crime={this.crime}
                                documentary={this.documentary}
                                drama={this.drama}
                                family={this.family}
                                fantasy={this.fantasy}
                                history={this.history}
                                horror={this.horror}
                                music={this.music}
                                mystery={this.mystery}
                                romance={this.romance}
                                sf={this.sf}
                                tvMovie={this.tvMovie}
                                thriller={this.thriller}
                                war={this.war}
                                western={this.western}
                                cRate={this.state.upRating}
                            />
                            <Text style={{ textAlign:'center', color: 'white', fontFamily: 'NR'}}>Swipe down to close</Text>
                        </Modal>
                    </View>

                    <View>
                        <Modal 
                            isVisible={this.state.isVisibleWishList}
                            onSwipe={() => this.setState({ isVisibleWishList: false })}
                            swipeDirection="down"
                        >
                            <WishList 
                                wishListId={[this.state.WishListId]}
                                select={this._selectWishList.bind(this)} 
                            />
                        </Modal>
                    </View>

                    <View>
                        <Modal 
                            isVisible={this.state.isVisibleHaveSeen}
                            onSwipe={() => this.setState({ isVisibleHaveSeen: false })}
                            swipeDirection="down"
                        >
                            <HaveSeen 
                                haveSeenId={[this.state.HaveSeenId]}
                                select={this._selectHaveSeen.bind(this)} 
                            />
                        </Modal>
                    </View>

                    <View>
                        <Modal 
                            isVisible={this.state.isVisibleSettings}
                            onSwipe={() => this.setState({ isVisibleSettings: false })}
                            swipeDirection="down"
                        >
                            <Settings />
                        </Modal>
                    </View>
                    

                </View>

            </View>
        );
    } else {
        return <View><Text>Loading...</Text></View>;
      }
    }
}

class CardInfo extends Component {
    render () {
        return (
            <Card
                containerStyle={{height:'91%', marginLeft: -1}}
                image={{uri: ImageURL + '/' + this.props.image}}
                imageStyle={{height:'72%'}}
            >
                <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7, fontFamily: 'Nixgon'}}>
                    [{this.props.char}] 역
                </Text>
                <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: -2, fontFamily: 'Nixgon'}}>
                    {this.props.name}
                </Text>
            </Card>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  adBox: {
    flex: 0.9,
    // backgroundColor: '#1E1E24',
    // alignItems: 'flex-end'
    },

  cardBox: {
    flex: 6,
    backgroundColor: '#fdf0f0',
    position: 'relative',
    },
    cardBox2: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 20,
        },
        cardBox3: {
            flex: 1,
            width: '100%',
            alignSelf: 'center',
            // marginTop: 5,
            // backgroundColor: '#fff9f9',
            borderWidth: 0.5,
            borderColor: 'transparent',
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
                flex: 2,
                flexDirection: 'row',
                backgroundColor: '#fff9f9',
                // marginBottom: 5,
                alignItems: 'center',
                paddingBottom: 3,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                paddingLeft: 3,
                paddingRight: 3,
                },
                box1_in1: {
                    flex: 4,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
                box1_in2: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                },
            box2: {
                flex: 1.3,
                backgroundColor: '#fff9f9',
                flexDirection: 'row',
                paddingLeft: 3,
                paddingRight: 3,
                },
                box2_in1: {
                    flex: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 5,
                },
                box2_in2: {
                    flex: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginBottom: 5,
                },
            box3: {
                flex: 5.5,
                backgroundColor: '#fff9f9',
                // marginBottom: 5,
                flexDirection: 'column',
                paddingLeft: 5,
                paddingRight: 5,
                },
                box3_in1: {
                    paddingLeft: 3,
                    paddingRight: 3,
                    marginBottom: 3,
                },
                box3_in2: {
                    flexDirection: 'row', 
                    marginBottom: 5, 
                    // marginLeft: -13,
                    // backgroundColor: 'green',
                    marginTop: -13,
                    paddingLeft: 3,

                },
            box4: {
                flex: 3,
                backgroundColor: '#fff9f9',
                paddingBottom: 3,
                paddingLeft: 5,
                paddingRight: 5,
                // marginBottom: 5,
                // elevation: 1,
                // zIndex: 2000,
                marginBottom: -0.5,
            },
            box6: {
                flex: 2,
                backgroundColor: '#fff9f9',
                // marginBottom: 5,
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
                paddingLeft: 3,
                paddingRight: 3,
                flexDirection: 'row',
                alignItems: 'center',
                },
                box6_wishlist: {
                    flex: 3,
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#444140',
                    borderColor: '#444140',
                    borderRadius: 10,
                    width: 80,
                    height: 40,
                },
                box6_haveseen: {
                    flex: 3,
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#444140',
                    borderColor: '#444140',
                    borderRadius: 10,
                    width: 80,
                    height: 40,
                    
                },

  buttonBox: {
    flex: 1.3,
    backgroundColor: '#fdf0f0',
    // backgroundColor: '#0061ff',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    // zIndex: 2000,
    },
    buttonMix: {
        flex: 1,
        backgroundColor: '#C77FFB',
        borderColor: '#C77FFB',
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
        color: '#fbf9fa',
        marginBottom: 5
      },


      actionButtonIcon2: {
        fontSize: 35,
        height: 32,
        color: '#fbf9fa',
        marginBottom: 5,
      },

});
