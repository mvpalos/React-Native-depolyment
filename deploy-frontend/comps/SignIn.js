import React from 'react';
import axios from 'axios';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';

export default class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
           error: []
        };
        //this.registerHandler = this.registerHandler.bind(this);
        //this.removeErrorHandler = this.removeErrorHandler.bind(this);
    }

    componentWillMount(){
         //checking validity of JWT (authoritization token)
//         axios.post('/validtoken',({jwt:localStorage.getItem("jwt")}))
//         .then((result)=>{
//             //if there username or password is not sending an error,(account isnt made)
//             //push the props(of all forms filled) to changing browser endpoint of '/feed'
//             if(!result.data.error){
//                 this.props.history.push("/feed");
//             }
//         })
//         //send error if there is existing account
//         .catch((err)=>{
//             console.log(err);
//         })
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
                <Text style = {styles.title}>Hello.</Text>
                <TextInput style = {styles.entryText} placeholder = "Username" />
                <TextInput style = {styles.entryText} placeholder = "Password" />

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
        padding: 30,
    }

});

AppRegistry.registerComponent('SignIn', () => SignIn);