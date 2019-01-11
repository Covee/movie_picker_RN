import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Modal from "react-native-modal";
import MultiSelectView from 'react-native-multiselect-view'


// const genreID = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
// const 

const country = ['국내 영화', '해외 영화']

export default class Filter extends Component {
    constructor(props) {
		super(props);
		this.state = {
            country: this.props.country,
            abc: false,
        };
    }

    _pickCountry = () => {
        let a = this.refs.list.selectedItems()
        // console.log(this.refs.list.selectedItems())
        console.log("now state: " + a[0])
        this.setState({
            abc: true
        })
        console.log("AFTER state: " + this.state.abc)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={{color: 'white',}}>Filter</Text>
                </View>
                <View style={styles.box2}>
                    <View style={styles.countries}>
                        <MultiSelectView
                            ref='list'
                            onSelectionStatusChange={this.onSelectionStatusChange}
                            data={country}
                            activeContainerStyle={styles.activeCom}
                            inactiveContainerStyle={styles.inactiveCom}
                            activeTextStyle={styles.activeText}
                            inactiveTextStyle={styles.inactiveText}
                        />
                        <TouchableOpacity 
                            onPress={()=> {
                                this.setState({
                                    country: this.props.aa
                                })
                                console.log(this.state.country)
                            }}
                        >
                            <View>
                                <Text>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ratingGT}>
                    
                    </View>
                    <View style={styles.genres}>
                    
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
            ratingGT: {
                flex: 2
            },
            genres: {
                flex: 6
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
                },
                buttonText: {
                    flex:1, 
                    fontSize:14, 
                    color:'white', 
                    fontWeight:'600', 
                    alignSelf: 'center',
                    justifyContent: 'center',
                }
  
   
});


