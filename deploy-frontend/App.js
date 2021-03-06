import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native'
import SignIn from './comps/SignIn.js';
import Home from './comps/Home.js';
import Register from './comps/Register.js';
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter history={history}>
      <View style={styles.container}>
        <Switch>
          <Route exact path = '/' component = {SignIn} />
          <Route exact path = '/home' render = {(props) => <Home history = {props.history}/>}/>
          <Route exact path = '/register' component = {Register} />
        </Switch>
      </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('App', () => App);
