import React from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native'
import axios from 'axios';


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            userName: ""
        }
    this.logoutHandler = this.logoutHandler.bind(this)
    }

componentDidMount(){
    axios.post('/validtoken', {
        jwt: AsyncStorage.getItem('jwt')
    })
    .then(result =>{
        if(result.data.error){
            this.props.history.push('/')
        }
        else{
            this.setState({
                userName: result.data.alias
            });
        }
    })
}

logoutHandler(){
    AsyncStorage.removeItem('jwt');
    this.props.history.push('/');
}

render(){
        return(
            <View>
            <Text>Welcome, {this.state.userName}</Text>
            <Button onPress = {this.logoutHandler} title = "Logout"/>
            </View>
        )
    }
}

AppRegistry.registerComponent('Home', () => Home);