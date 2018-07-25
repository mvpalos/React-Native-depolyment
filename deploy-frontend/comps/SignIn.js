import React from 'react';
import axios from 'axios';
import { AppRegistry, 
         StyleSheet, 
         Text, 
         View, 
         Button, 
         AsyncStorage,
         } from 'react-native';
import {Link, Redirect} from 'react-router-native';
import t from 'tcomb-form-native';
import Register from './Register.js'

const Form = t.form.Form;

const User = t.struct({
      username: t.String,
      password: t.String
});

const options = {
    fields: {
        username: {
            error: 'please type in username'
        },
        password: {
            secureTextEntry: true,
            error: 'please type in password'
        }
    }
};


export default class SignIn extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.registerRedirect = this.registerRedirect.bind(this);
    }
    componentWillMount(){
        axios.post('http://localhost:8080/validtoken',({jwt:AsyncStorage.getItem("jwt")}))
        .then((result)=>{
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    handleSubmit = (event)=> { 
        axios.post('http://localhost:8080/login', {
            username: this.refs.form.getValue().username, 
            password: this.refs.form.getValue().password
            })
            .then((result)=>{
                if(!result.data.error){
                    if(result.data.jwt){
                        AsyncStorage.setItem("jwt", result.data.jwt);
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

// registerRedirect(){
//     return require('./Register.js')
// }

    render(){
        return(
            <View style = {styles.container}>

                <Text style = {styles.title}>Login</Text>

                <Form ref = "form" type = {User} options = {options} />

                <Button  onPress = {this.handleSubmit} title = "Login"/>
                <Button  onPress = {()=> navigator.push(registerRedirect())} title = "Register"/>

                <Link to = '/register'>
                <Text style = {styles.registerButton} accessibilityLabel="Learn more about this purple button" >Register</Text>
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
    registerButton: {
        height: 40,
        borderColor: '#48BBEC',
        padding: 50

    }

});

AppRegistry.registerComponent('SignIn', () => SignIn);