import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';

import Modal from "react-native-modal";
import MultiSelectView from 'react-native-multiselect-view'
import SwitchToggle from 'react-native-switch-toggle';
import MotionSlider from 'react-native-motion-slider';

import { Font } from 'expo';

// const genreID = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

// const genre = ['액션', '어드벤처', '애니메이션', '코미디', '범죄', '다큐멘터리', '드라마', '가족', '판타지', '역사', '공포', '음악', '미스테리', '멜로', 'SF', 'TV 영화', '스릴러', '전쟁', '서부']

let actionS = false
let adventureS = false
let animationS = false
let comedyS = false
let crimeS = false
let documentaryS = false
let dramaS = false
let familyS = false
let fantasyS = false
let historyS = false
let horrorS = false
let musicS = false
let mysteryS = false
let romanceS = false
let sfS = false
let tvMovieS = false
let thrillerS = false
let warS = false
let westernS = false

export default class Filter extends Component {
    constructor(props) {
        super(props);
		this.state = {
            abc: false,
            isReady: false,
            switch: this.props.switch,
            actionS: actionS,
            adventureS: adventureS,
            animationS: animationS,
            comedyS: comedyS,
            crimeS: crimeS,
            documentaryS: documentaryS,
            dramaS: dramaS,
            familyS: familyS,
            fantasyS: fantasyS,
            historyS: historyS,
            horrorS: horrorS,
            musicS: musicS,
            mysteryS: mysteryS,
            romanceS: romanceS,
            sfS: sfS,
            tvMovieS: tvMovieS,
            thrillerS: thrillerS,
            warS: warS,
            westernS: westernS,
            cRate: this.props.cRate
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'HM': require('../../assets/fonts/BM.ttf'),
            'Nixgon': require('../../assets/fonts/NIXGON.ttf'),
            'Nanum': require('../../assets/fonts/NanumBarunGothic.ttf'),
            'UhBee': require('../../assets/fonts/UhBee.ttf'),
        });
        this.setState({ isReady: true });
    }

    _changeAction = () => {
        this.state.actionS==false ? this.setState({actionS:true}) : this.setState({actionS:false})
        actionS==false ? actionS=true :actionS=false
    }
    _changeAdventure = () => {
        this.state.adventureS==false ? this.setState({adventureS:true}) : this.setState({adventureS:false})
        adventureS==false ? adventureS=true :adventureS=false
    }
    _changeAnimation = () => {
        this.state.animationS==false ? this.setState({animationS:true}) : this.setState({animationS:false})
        animationS==false ? animationS=true :animationS=false
    }
    _changeComedy = () => {
        this.state.comedyS==false ? this.setState({comedyS:true}) : this.setState({comedyS:false})
        comedyS==false ? comedyS=true :comedyS=false
    }
    _changeCrime = () => {
        this.state.crimeS==false ? this.setState({crimeS:true}) : this.setState({crimeS:false})
        crimeS==false ? crimeS=true :crimeS=false
    }
    _changeDocumentary = () => {
        this.state.documentaryS==false ? this.setState({documentaryS:true}) : this.setState({documentaryS:false})
        documentaryS==false ? documentaryS=true :documentaryS=false
    }
    _changeDrama = () => {
        this.state.dramaS==false ? this.setState({dramaS:true}) : this.setState({dramaS:false})
        dramaS==false ? dramaS=true :dramaS=false
    }
    _changeFamily = () => {
        this.state.familyS==false ? this.setState({familyS:true}) : this.setState({familyS:false})
        familyS==false ? familyS=true :familyS=false
    }
    _changeFantasy = () => {
        this.state.fantasyS==false ? this.setState({fantasyS:true}) : this.setState({fantasyS:false})
        fantasyS==false ? fantasyS=true :fantasyS=false
    }
    _changeHistory = () => {
        this.state.historyS==false ? this.setState({historyS:true}) : this.setState({historyS:false})
        historyS==false ? historyS=true :historyS=false
    }
    _changeHorror = () => {
        this.state.horrorS==false ? this.setState({horrorS:true}) : this.setState({horrorS:false})
        horrorS==false ? horrorS=true :horrorS=false
    }
    _changeMusic = () => {
        this.state.musicS==false ? this.setState({musicS:true}) : this.setState({musicS:false})
        musicS==false ? musicS=true :musicS=false
    }
    _changeMystery = () => {
        this.state.mysteryS==false ? this.setState({mysteryS:true}) : this.setState({mysteryS:false})
        mysteryS==false ? mysteryS=true :mysteryS=false
    }
    _changeRomance = () => {
        this.state.romanceS==false ? this.setState({romanceS:true}) : this.setState({romanceS:false})
        romanceS==false ? romanceS=true :romanceS=false
    }
    _changeSf = () => {
        this.state.sfS==false ? this.setState({sfS:true}) : this.setState({sfS:false})
        sfS==false ? sfS=true :sfS=false
    }
    _changeTvMovie = () => {
        this.state.tvMovieS==false ? this.setState({tvMovieS:true}) : this.setState({tvMovieS:false})
        tvMovieS==false ? tvMovieS=true :tvMovieS=false
    }
    _changeThriller = () => {
        this.state.thrillerS==false ? this.setState({thrillerS:true}) : this.setState({thrillerS:false})
        thrillerS==false ? thrillerS=true :thrillerS=false
    }
    _changeWar = () => {
        this.state.warS==false ? this.setState({warS:true}) : this.setState({warS:false})
        warS==false ? warS=true :warS=false
    }
    _changeWestern = () => {
        this.state.westernS==false ? this.setState({westernS:true}) : this.setState({westernS:false})
        westernS==false ? westernS=true :westernS=false
    }

    render() {
        if (this.state.isReady == true) {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={{color: '#ebebe3', fontSize: 32, fontWeight: '900', fontFamily: 'Nixgon'}}>필터</Text>
                </View>
                <View style={styles.box2}>
                    <View style={styles.countries}>
                        {/* <Text style={{textAlign: 'center', fontSize: 20}}>국가</Text> */}
                        <View style={{flexDirection: 'row', alignSelf: 'center',}}>
                            <View style={{flex:1, justifyContent: 'center', marginTop: 10}}>
                                <Text style={{textAlign: 'center', fontSize: 18, color: '#fafafa', fontWeight: '700', fontFamily: 'Nixgon'}}>한국 영화</Text>
                            </View>
                            <View style={{flex:2, alignItems:'center'}}>
                                <SwitchToggle
                                    containerStyle={{
                                        marginTop: 16,
                                        width: 140,
                                        height: 48,
                                        borderRadius: 25,
                                        backgroundColor: 'rgba(52, 52, 52, 0.1)',
                                        padding: 5,
                                    }}
                                    circleStyle={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: 'gray', // rgb(102,134,205)
                                    }}
                                    switchOn={this.props.switch}
                                    onPress={this.props.changeCountry}
                                    circleColorOff='#e61c5d'
                                    circleColorOn='#e61c5d'
                                    duration={500}
                                />
                            </View>
                            <View style={{flex:1, justifyContent: 'center', marginTop: 10}}>
                                <Text style={{textAlign: 'center', fontSize: 18, color: '#fafafa', fontWeight: '700', fontFamily: 'Nixgon'}}>외국 영화</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ratingGT}>
                        <View style={{marginBottom:15}}>
                            <Text style={{textAlign: 'center', fontSize: 24, color: '#ebd5d5', fontWeight: '800', fontFamily: 'Nixgon'}}>평점</Text>
                        </View>
                        <View style={{flex:1}}>
                            <MotionSlider
                                // title={'Choose the desired temperature'} 
                                min={0} 
                                max={100}
                                value={(this.props.cRate=='' ) ? 50 : this.props.cRate} 
                                decimalPlaces={0}
                                units={'점'}
                                backgroundColor={['rgb(3, 169, 244)', 'rgb(255, 152, 0)', 'rgb(255, 87, 34)']}
                                onValueChanged={(value) => {
                                    this.props.changeRating(value)
                                }}
                                onPressIn={() => console.log('Pressed in')}
                                onPressOut={() => console.log('Pressed out')}
                                onDrag={() => console.log('Dragging')}
                            />
                        </View>
                    </View>
                    <View style={styles.genres}>
                        <View style={{marginBottom:15}}>
                            <Text style={{textAlign: 'center', fontSize: 24, color: '#ebd5d5', fontWeight: '800', fontFamily: 'Nixgon'}}>장르</Text>
                        </View>
                        <View style={{flexDirection:'row', flexWrap: 'wrap', padding: 5,}}>
                            <TouchableOpacity 
                                onPress={this.props.action}
                                onPressOut={this._changeAction}
                                style={(this.state.actionS) ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>액션</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={this.props.adventure}
                                onPressOut={this._changeAdventure}
                                style={this.state.adventureS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>어드벤처</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.animation}
                                onPressOut={this._changeAnimation}
                                style={this.state.animationS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>애니메이션</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.comedy}
                                onPressOut={this._changeComedy}
                                style={this.state.comedyS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>코미디</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.crime}
                                onPressOut={this._changeCrime}
                                style={this.state.crimeS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>범죄</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.documentary}
                                onPressOut={this._changeDocumentary}
                                style={this.state.documentaryS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>다큐멘터리</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.drama}
                                onPressOut={this._changeDrama}
                                style={this.state.dramaS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>드라마</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.family}
                                onPressOut={this._changeFamily}
                                style={this.state.familyS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>가족</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.fantasy}
                                onPressOut={this._changeFantasy}
                                style={this.state.fantasyS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>판타지</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.history}
                                onPressOut={this._changeHistory}
                                style={this.state.historyS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>역사</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.horror}
                                onPressOut={this._changeHorror}
                                style={this.state.horrorS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>공포</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.music}
                                onPressOut={this._changeMusic}
                                style={this.state.musicS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>음악</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.mystery}
                                onPressOut={this._changeMystery}
                                style={this.state.mysteryS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>미스테리</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.romance}
                                onPressOut={this._changeRomance}
                                style={this.state.romanceS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>멜로</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.sf}
                                onPressOut={this._changeSf}
                                style={this.state.sfS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>SF</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.tvMovie}
                                onPressOut={this._changeTvMovie}
                                style={this.state.tvMovieS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>TV 영화</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.thriller}
                                onPressOut={this._changeThriller}
                                style={this.state.thrillerS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>스릴러</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.war}
                                onPressOut={this._changeWar}
                                style={this.state.warS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>전쟁</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.western}
                                onPressOut={this._changeWestern}
                                style={this.state.westernS ? styles.genreButtonOn : styles.genreButtonOff}
                            >
                                <Text style={styles.genreButtonText}>서부</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    } else {
        return <View><Text>Loading...</Text></View>;
      }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
        },
        box: {
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'center',
            paddingBottom: 5,
        },
        box2: {
            flex: 8,
            borderRadius: 5,
            borderColor: 'transparent',
            borderWidth: 2,
            backgroundColor: 'transparent',
            },
            countries: {
                flex: 2,
                padding: 5,
                },
                countryChoice: {
                    backgroundColor: 'gray',
                    borderColor: 'gray',
                    borderRadius: 25,
                    width: 120,
                    height: 30,
                    alignSelf: 'center',
                    alignItems: 'center',
                    padding: 5,
                    margin: 5,
                },
            ratingGT: {
                flex: 2
            },
            genres: {
                flex: 5,
                },
                genreButtonOn: {
                    position: 'relative',
                    backgroundColor: '#fa0559',
                    borderColor: '#fa0559',
                    borderRadius: 7,
                    width: 'auto',
                    height: 40,
                    padding: 5,
                    paddingRight: 15,
                    paddingLeft: 15,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5,
                    color: 'white'
                },
                genreButtonOff: {
                    position: 'relative',
                    backgroundColor: '#fafafa',
                    borderColor: '#fafafa',
                    borderRadius: 7,
                    width: 'auto',
                    height: 35,
                    padding: 5,
                    paddingRight: 10,
                    paddingLeft: 10,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5,
                },
                genreButtonText: {
                    textAlign: 'center',
                    fontSize: 17,
                    fontFamily: 'Nixgon',
                },
            buttonConfirm: {
                flex: 1,
                backgroundColor: '#1abc9c',
                borderColor: '#1abc9c',
                borderRadius: 15,
                width: 120,
                height: 50,
                // padding: 20,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                },
                buttonText: {
                    flex:1, 
                    fontSize:14, 
                    color:'white', 
                    fontWeight:'600', 
                    alignSelf: 'center',
                }
  
   
});


