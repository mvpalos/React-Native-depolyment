import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native'
import SignIn from './comps/SignIn.js';
import Home from './comps/Home.js';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path = '/' component = {SignIn} />
          <Route exact path = '/home' render = {(props) => <Home history = {props.history}/>}/>
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
