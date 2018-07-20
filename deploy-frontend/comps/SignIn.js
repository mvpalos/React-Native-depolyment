import React from 'react';
import axios from 'axios';
import { AppRegistry, 
         StyleSheet, 
         Text, 
         View, 
         Button,
         TextInput, 
         AsyncStorage } from 'react-native';
import {Link} from 'react-router-native';


const options = {};


export default class SignIn extends React.Component{
    constructor(){
        super();
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

    handleSubmit = (event)=> { 
        axios.post('http://localhost:8080/login', {
            userName: refs.userName.value, 
            password: refs.password.value
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
                
                {/* <Button onPress = {this.handleSubmit}>Sign in</Button> */}

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