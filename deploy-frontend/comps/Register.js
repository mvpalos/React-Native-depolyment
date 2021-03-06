import React from 'react';
import {Text, 
    AppRegistry, 
    View, 
    StyleSheet,
    Button, 
    TextInput,
    AsyncStorage} from 'react-native';
import {Link} from 'react-router-native'
import axios from 'axios';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
    retypePassword: t.String,
});

const options = {
    fields: {
        password:{
            secureTextEntry: true
        },
        retypePassword: {
            secureTextEntry: true
        }
    }
};

export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.stat = {
            error: []
        };
    this.registerHandler = this.registerHandler.bind(this);
    this.removeErrorHandler = this.removeErrorHandler.bind(this);
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

registerHandler(){
       axios.post("http://localhost:8080/register", {
           username: this.refs.forms.getValue().username,
           password: this.refs.forms.getValue().password,
           retypePassword: this.refs.forms.getValue().retypePassword
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
        ref = "form" type = {User} options = {options} />

        <Button onPress = {this.registerHandler} title = "Submit"/>
        
        <Link to = '/'><Text style = {styles.backButton}>back</Text></Link>
        </View>
    )
}

}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        padding: 50,
    },
    backButton: {
        height: 40,
        borderColor: '#48BBEC',
        padding: 50
    }

});


AppRegistry.registerComponent('Register', () => Register);