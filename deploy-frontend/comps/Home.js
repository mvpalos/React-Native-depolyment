import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';
//import {NativeRouter, Switch, Route} from 'react-router-native'
export default class Home extends React.Component{
    constructor(){
        super();
        this.state ={

        }
    }

    render(){
        return(
            <Text>This is the Home Page </Text>
        )
    }
}

AppRegistry.registerComponent('Home', () => Home);