import React from 'react';
import axios from 'axios';
import { AppRegistry, 
         StyleSheet, 
         Text, 
         View, 
         Button, 
         AsyncStorage } from 'react-native';
import {Link} from 'react-router-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;
const User = t.struct({
      username: t.String,
      password: t.String
});

const options = {
    fields: {
        password: {
            secureTextEntry: true
        }
    }
};


export default class SignIn extends React.Component{
    constructor(){
        super();
        this.getValue = this.getValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
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

getValue(){
    this.refs.form.getValue()
    "Username: " + this.refs.form.getValue().username,
    "Password: " + this.refs.form.getValue().password
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

                <Form ref = "form" type = {User} options = {options} />

                <Button  onPress = {this.handleSubmit} title = "Login"/>

                <Link to = '/register'>
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
    registerButton: {
        height: 40,
        borderColor: '#48BBEC',
        padding: 50
    }

});

AppRegistry.registerComponent('SignIn', () => SignIn);