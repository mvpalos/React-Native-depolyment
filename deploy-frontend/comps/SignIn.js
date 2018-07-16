import React from 'react';
import axios from 'axios';
import { AppRegistry, StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import {Link} from 'react-router-native'


export default class SignIn extends React.Component{

    componentWillMount()
    {
        axios.post('http://localhost:8080/validtoken',({jwt:AsyncStorage.getItem("jwt")}))
        .then((result)=>{
            if(!result.data.error){
                this.props.history.push("/home");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    handleSubmit = (event)=> {
        event.preventDefault(); 
        axios.post('http://localhost:8080/login', {
            userName: event.target.userName.value, 
            password: event.target.password.value
            })
            .then((result)=>{
                if(!result.data.error){
                    if(result.data.jwt){
                        AsyncStorage.setItem("jwt", result.data.jwt);
                        this.props.history.push('/home');
                    }
                }
                else {
                    console.log("Failed to login");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
 
    }

removeErrorHandler(){
   this.setState({
       error: []
   })
}

    render(){
        return(
            <View style = {styles.container}> 
                <Text style = {styles.title}>Login</Text>
                <TextInput style = {styles.entryText} placeholder = "Username"/>
                <TextInput style = {styles.entryText} secureTextEntry = {true} placeholder = "Password"/>

                <Text style = {styles.button}>Sign In</Text>
                
                <Link to = 'http://localhost:8080/register'>
                <Text style = {styles.registerButton}>Register</Text>
                </Link>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 50,
        padding: 50,
    },
    entryText :{
        fontSize: 20,
        padding: 15,
        color: 'black',
        borderWidth: .45,
        borderColor: '#48BBEC',
        borderRadius: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'black'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 80
    },
    registerButton: {
        height: 40,
        borderColor: '#48BBEC',
        padding: 50
    }

});

AppRegistry.registerComponent('SignIn', () => SignIn);