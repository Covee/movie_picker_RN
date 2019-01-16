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


import CardFlip from 'react-native-card-flip';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

const API_KEY = '61ffab023e612aa11ca364354a4c0e6b';
const mainURL = "https://api.themoviedb.org/3/"
const ImageURL = "https://image.tmdb.org/t/p/w500"
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=61ffab023e612aa11ca364354a4c0e6b"

const arrWishlist = []

let arrHaveSeen = []
let seenTitle = []
let seenYear = []
let seenRating = []

// FILTER GENRES
let genArr = []
let action1 = false
let adventure1 = false



export default class Main extends Component {
    constructor(props) {
        super(props);
        this.changeCountry = this._changeCountry.bind(this)
        this.action = this._action.bind(this)
        this.adventure = this._adventure.bind(this)
        
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
            isVisibleFilter: false,
            isVisibleWishList: false,
            isVisibleHaveSeen: false,
            pickedId: null,
            randNumA: 217,
            randNumB: null,
            genre: null,
            cast: [],
            castImage: [],
            castChar: [],
            HaveSeenId:[],
            WishListId:[],
            switch: false,
            action0: '',
            adventure0: '',
            genArr: null,
        }
    }

// EXECUTION   
    _filter = async () => {
        console.log("-----filter함수 시작됩니다----")
        this.setState({
            randNumA: Math.ceil(Math.random() * (this.state.randNumA)),
            randNumB: Math.floor(Math.random() * 20),
            cast: [],
        })
        // await this._changeGenre()
        console.log("MAX ?? >>> " + this.state.randNumA + "genArr => " + this.state.genArr)
        await fetch (discoverURL + '&language=ko-KR&with_original_language=' + this.state.country + '&page=' + this.state.randNumA + '&vote_average.gte=' + '&with_genres=' ).then(response => response.json())
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
                                rating: json.vote_average,
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
                                rating: json.vote_average,
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
                    // if (this.state.country == 'ko') {
                    //     this.setState({randNumA: Math.floor(Math.random() * 217)+1})
                    // } else {
                    //     this.setState({randNumA: Math.floor(Math.random() * 1000)+1})
                    // }
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
    // _getMaxPage = (genres) => {
    //     fetch(discoverURL + '&language=ko-KR&with_original_language=' + this.state.country + '&page=' + '&vote_average.gte=' + '&with_genres=' + genres).then(response => response.json())
    //     .then(json => {
    //         this.setState({
    //             randNumA: Math.floor(Math.random() * json.total_pages+1)
    //         })
    //     })
    // }

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

    _changeGenre = async () => {
        let arrange;
        for(i=0; i<genArr.length; i++){
            arrange.push(genArr[i])
        }
        arrange.join('')
        this.setState({
            genArr: arrange
        })
        await fetch(discoverURL + '&language=ko-KR&with_original_language=' + this.state.country + '&page=' + '&vote_average.gte=' + '&with_genres=' + this.state.genArr).then(response => response.json())
        .then(json => {
            this.setState({
                randNumA: Math.floor(Math.random() * json.total_pages+1)
            })
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
        console.log("genArr >>> " + genArr)
    }




    _wishList() {
        let a = true
        // pickedId를 로컬에 array로 save해뒀다가 modal버튼(wishlist) onPress 시 로컬array에 있는 아이디들을 차례로 fetch해서 넣고 보여준다.
        
        for(i=0; i<arrWishlist.length; i++){
            if (this.state.pickedId == arrWishlist[i]) {
                Alert.alert("This movie is already in your WishList!")
                a = false
                break;
            }
        }
        
        if (a == true){
            arrWishlist.push(this.state.pickedId)
            Alert.alert("added in your WishList")
        }
        
        console.log(arrWishlist)
        
    }

    async _haveSeen() {
        arrHaveSeen = await AsyncStorage.getItem('id')
        arrHaveSeen = JSON.parse(arrHaveSeen)
        seenTitle = await AsyncStorage.getItem('title')
        seenTitle = JSON.parse(seenTitle)
        seenYear = await AsyncStorage.getItem('year')
        seenYear = JSON.parse(seenYear)
        seenRating = await AsyncStorage.getItem('rating')
        seenRating = JSON.parse(seenRating)

        let a = true
        // pickedId를 로컬에 array로 save해뒀다가 modal버튼(haveSeen) onPress 시 로컬array에 있는 아이디들을 차례로 fetch해서 넣고 보여준다.
        
        for(i=0; i<arrHaveSeen.length; i++){
            if (this.state.pickedId == arrHaveSeen[i]) {
                Alert.alert("이미 리스트에 추가되어 있습니다!")
                a = false
                break;
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

    _saveHaveSeen = async () => {
        await AsyncStorage.setItem('id', JSON.stringify(arrHaveSeen))
        await AsyncStorage.setItem('title', JSON.stringify(seenTitle))
        await AsyncStorage.setItem('year', JSON.stringify(seenYear))
        await AsyncStorage.setItem('rating', JSON.stringify(seenRating))
    }

    _actionHaveSeen = () => {
        this.setState({isVisibleHaveSeen: true})
    }

    _actionWishList = () => {
        this.setState({isVisibleWishList: true})
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
        
        const { 
            title, year, rating, runtime, income, story, poster, genre, cast, pickedId 
        } = this.state;
        return (
            <View style={styles.container}>

                {/* AD */}
                <View style={styles.adBox}>
                    <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                        <Text>pickedId: {pickedId}</Text>
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
                                    <Text style={{fontSize:17, fontWeight:'600', marginBottom: -2,}}>줄거리</Text>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                                        activeOpacity= {1}
                                    >
                                        <Text style={{height: '100%', width: '100%', paddingLeft: -1, paddingRight: 2, paddingTop: 4,}}>{story}</Text>
                                    </TouchableOpacity>     
                                </ScrollView>
                            </View>

                            <View style={styles.box6}>
                                    <View style={{flex:1}} />
                                <TouchableOpacity 
                                    style={styles.box6_wishlist}
                                    onPress={()=>this._wishList()}
                                >
                                    <Icon name="ios-heart" style={{fontSize:30, color:'#fbf9fa', fontWeight:'700', paddingTop: 5}} />
                                </TouchableOpacity>
                                    <View style={{flex:1}} />
                                <TouchableOpacity 
                                    style={styles.box6_haveseen}
                                    onPress={()=>this._haveSeen()}
                                >
                                    <Icon name="ios-eye" style={{fontSize:30, color:'#fbf9fa', fontWeight:'700', paddingTop: 5}} />
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
                                onPress={() =>
                                    this._actionWishList()
                                }
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
                                onPress={(e) => this._changeCountry()}
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
                            swipeDirection="right"
                        >
                            <Filter 
                                changeCountry={this.changeCountry}
                                switch={this.state.switch}
                                action={this.action}
                                adventure={this._adventure}
                            />
                            {/* <View style={{ flex: 1, justifyContent:'center'}}>
                                <Text style={{ textAlign:'center', color: 'white',}}>This is Filter Page</Text>
                                <Text style={{ textAlign:'center', color: 'white',}}>Swipe right to close</Text>
                            </View> */}
                        </Modal>
                    </View>

                    <View>
                        <Modal 
                            isVisible={this.state.isVisibleWishList}
                            onSwipe={() => this.setState({ isVisibleWishList: false })}
                            swipeDirection="right"
                        >
                            <WishList />
                        </Modal>
                    </View>

                    <View>
                        <Modal 
                            isVisible={this.state.isVisibleHaveSeen}
                            onSwipe={() => this.setState({ isVisibleHaveSeen: false })}
                            swipeDirection="right"
                        >
                            <HaveSeen 
                                haveSeenId={[this.state.HaveSeenId]}
                                select={this._selectHaveSeen.bind(this)} 
                            />
                        </Modal>
                    </View>
                    

                </View>

            </View>
        );
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
                <Text style={{fontSize: 12, textAlign: 'center', marginTop: -7}}>
                    [{this.props.char}] 역
                </Text>
                <Text style={{fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: -2}}>
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
    flex: 1,
    backgroundColor: '#1E1E24',
    alignItems: 'flex-end'
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
                },
                box1_in2: {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                },
            box2: {
                flex: 1.3,
                backgroundColor: '#fff9f9',
                // marginBottom: 5,
                flexDirection: 'row',
                paddingLeft: 3,
                paddingRight: 3,
                },
                box2_in1: {
                    flex: 1,
                },
                box2_in2: {
                    flex: 1,
                },
            box3: {
                flex: 5.5,
                backgroundColor: '#fff9f9',
                // marginBottom: 5,
                flexDirection: 'column',
                },
                box3_in1: {
                    paddingLeft: 3,
                    paddingRight: 3,
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
                paddingLeft: 2,
                paddingRight: 3,
                // marginBottom: 5,
                // elevation: 1,
                // zIndex: 2000,
                marginBottom: -0.5,
            },
            box6: {
                flex: 3,
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
        backgroundColor: '#E54B4B',
        borderColor: '#E54B4B',
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
