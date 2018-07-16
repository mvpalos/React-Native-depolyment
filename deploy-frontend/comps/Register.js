import React from 'react';
import {Text, AppRegistry, View, StyleSheet, TextInput} from 'react-native';
import {Link} from 'react-router-native'
import axios from 'axios';

export default class Register extends React.Component {

    render(){
        return(
            <View>
            <Text style = {styles.title}>Register</Text>

            <TextInput style = {styles.entryText} placeholder = "Username"/>
            <TextInput style = {styles.entryText} secureTextEntry = {true} placeholder = "Password"/>
            <TextInput style = {styles.entryText} secureTextEntry = {true} placeholder = "Re-type Password"/>
            
            <Link to = '/'><Text style = {styles.backButton}>back</Text></Link>
            </View>
        )
    }
}

const  styles = StyleSheet.create({
    backButton: {
        padding: 50
    },
    title: {
        fontSize: 50,
    },
    entryText: {
        fontSize: 10,
        padding: 15,
        color: 'black',
        borderWidth: .45,
        borderColor: '#48BBEC',
        borderRadius: 1
    }
});

AppRegistry.registerComponent('Register', () => Register);