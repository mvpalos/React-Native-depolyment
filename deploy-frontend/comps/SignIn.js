import React from 'react';
import axios from 'axios';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';

export default class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
           error: []
        };
        this.registerHandler = this.registerHandler.bind(this);
        this.removeErrorHandler = this.removeErrorHandler.bind(this);
    }

    componentWillMount(){
         //checking validity of JWT (authoritization token)
         axios.post('/validtoken',({jwt:AsyncStorage.getItem("jwt")}))
         .then((result)=>{
             //if there username or password is not sending an error,(account isnt made)
             //push the props(of all forms filled) to changing browser endpoint of '/feed'
             if(!result.data.error){
                 this.props.history.push("/home");
             }
         })
         //send error if there is existing account
         .catch((err)=>{
             console.log(err);
         })
  }

registerHandler(e){
   e.preventDefault();

   if (e.target.username && e.target.password)
   {
       axios.post("/register", {
           username: e.target.username.value,
           password: e.target.password.value
       })
       .then((results) =>
       {
           if (!results.data.error)
           {
               if (results.data.jwt)
               {
                   localStorage.setItem("jwt", results.data.jwt);
                   this.props.history.push("/home");
               }
           }
           else
           {
               this.setState({
                   error: results.data.reason
               });
           }
       })
       .catch((error) =>
       {
           console.log(error);
       });
   }
}

removeErrorHandler(){
   this.setState({
       error: []
   })
}

    render(){
        return(
            <View>
                <Text style = {styles.title}>Login</Text>
                <TextInput style = {styles.entryText} placeholder = "Username"/>
                <TextInput style = {styles.entryText} placeholder = "Password"/>

                <TouchableHighlight stlye = {styles.buttonText} onPress >
                <Text style = {styles.button}>Sign In</Text>

                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        color: 'black',
        alignSelf: 'center'
    },
    button: {
        height: 40,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        marginLeft: 10,
        width: 80,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }

});

AppRegistry.registerComponent('SignIn', () => SignIn);