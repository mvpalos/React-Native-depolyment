import React from 'react';
import {Text, 
        AppRegistry, 
        View, 
        StyleSheet, 
        TextInput,
        AsyncStorage} from 'react-native';
import {Link} from 'react-router-native'
import axios from 'axios';
import t from 'tcomb-form-native';

const From = t.form.Form

let Register = t.structure({
    username: t.String,
    password: t.String
})

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            error:[]
        };
        this.registerHandler = this.registerHandler.bind(this);
        this.removeErrorHandler = this.removeErrorHandler.bind(this);
    }

componentWillMount(){
         axios.post('http://localhost:8080/validtoken',({jwt:AsyncStorage.getItem("jwt")}))
         .then((result)=>{
             if(!result.data.error){
                 this.props.history.push("/feed");
             }
         })
         .catch((err)=>{
             console.log(err);
         })
    }

registerHandler(e){
        axios.post("http://localhost:8080/register", {
            username: this.refs.forms.getValue().username,
            password: this.refs.forms.getValue().password

        })
        .then((results) =>
        {
            if (!results.data.error)
            {
                if (results.data.jwt)
                {
                    AsyncStorage.setItem("jwt", results.data.jwt);
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

removeErrorHandler(){
    this.setState({
        error: []
    })
}


    render(){
        return(
            <View>
            <Text style = {styles.title}>Register</Text>

            <Form 
            ref = "form"
            type = {Register}
            options = {options}
            />

            <Button onPress = {this.getValue} title = "Submit"/>

            {/* <TextInput style = {styles.entryText} placeholder = "Username"/>
            <TextInput style = {styles.entryText} secureTextEntry = {true} placeholder = "Password"/>
            <TextInput style = {styles.entryText} secureTextEntry = {true} placeholder = "Re-type Password"/> */}
            
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