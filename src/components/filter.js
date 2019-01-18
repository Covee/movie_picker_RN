import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Modal from "react-native-modal";
import MultiSelectView from 'react-native-multiselect-view'
import SwitchToggle from 'react-native-switch-toggle';



// const genreID = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
// const 

// const genre = ['액션', '어드벤처', '애니메이션', '코미디', '범죄', '다큐멘터리', '드라마', '가족', '판타지', '역사', '공포', '음악', '미스테리', '멜로', 'SF', 'TV 영화', '스릴러', '전쟁', '서부']

export default class Filter extends Component {
    constructor(props) {
		super(props);
		this.state = {
            abc: false,
            switch: this.props.switch,
        };
        
    }

    render() {
        const action = 'action'
        const adventure = 'adventure'

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={{color: 'white', fontSize: 20,}}>Filter</Text>
                </View>
                <View style={styles.box2}>
                    <View style={styles.countries}>
                        <Text style={{textAlign: 'center',}}>국가</Text>
                        <View style={{flexDirection: 'row', alignSelf: 'center',}}>
                            <View>
                                <Text>한국 영화</Text>
                            </View>
                            <SwitchToggle
                                containerStyle={{
                                    marginTop: 16,
                                    width: 108,
                                    height: 48,
                                    borderRadius: 25,
                                    backgroundColor: '#ccc',
                                    padding: 5,
                                }}
                                circleStyle={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: 19,
                                    backgroundColor: 'red', // rgb(102,134,205)
                                }}
                                switchOn={this.props.switch}
                                onPress={this.props.changeCountry}
                                circleColorOff='blue'
                                circleColorOn='red'
                                duration={500}
                            />
                            <View>
                                <Text>외국 영화</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ratingGT}>
                        <Text style={{textAlign: 'center',}}>평점</Text>
                    
                    </View>
                    <View style={styles.genres}>
                        <Text style={{textAlign: 'center',}}>장르</Text>
                        
                        <TouchableOpacity 
                            onPress={this.props.action}
                            style={styles.genreButton}
                        >
                            <Text style={styles.genreButtonText}>액션</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.adventure}
                        >
                            <Text style={{textAlign: 'center',}}>어드벤처</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.animation}
                        >
                            <Text style={{textAlign: 'center',}}>애니메이션</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.comedy}
                        >
                            <Text style={{textAlign: 'center',}}>코미디</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.crime}
                        >
                            <Text style={{textAlign: 'center',}}>범죄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.documentary}
                        >
                            <Text style={{textAlign: 'center',}}>다큐멘터리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.drama}
                        >
                            <Text style={{textAlign: 'center',}}>드라마</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.family}
                        >
                            <Text style={{textAlign: 'center',}}>가족</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.fantasy}
                        >
                            <Text style={{textAlign: 'center',}}>판타지</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.history}
                        >
                            <Text style={{textAlign: 'center',}}>역사</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.horror}
                        >
                            <Text style={{textAlign: 'center',}}>공포</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.music}
                        >
                            <Text style={{textAlign: 'center',}}>음악</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.mystery}
                        >
                            <Text style={{textAlign: 'center',}}>미스테리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.romance}
                        >
                            <Text style={{textAlign: 'center',}}>멜로</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.sf}
                        >
                            <Text style={{textAlign: 'center',}}>SF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.tvMovie}
                        >
                            <Text style={{textAlign: 'center',}}>TV 영화</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.thriller}
                        >
                            <Text style={{textAlign: 'center',}}>스릴러</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.war}
                        >
                            <Text style={{textAlign: 'center',}}>전쟁</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.props.western}
                        >
                            <Text style={{textAlign: 'center',}}>서부</Text>
                        </TouchableOpacity>
                    
                    </View>
                    <TouchableOpacity style={styles.buttonConfirm}>
                        <Text style={styles.buttonText}>업데이트</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
            borderColor: 'black',
            borderWidth: 2,
            backgroundColor: 'lightgreen',
            },
            countries: {
                flex: 2
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
                flex: 6,
                flexDirection: 'row',
                },
                genreButton: {
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    borderRadius: 20,
                    width: 100,
                    height: 40,
                    padding: 10,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                genreButtonText: {
                    textAlign: 'center',
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


