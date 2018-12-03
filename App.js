/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import Loading from './src/components/Loading';
import request from './src/utils/fetchlib';
import Products from './src/containers/Products'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: undefined
    };
  }

  componentDidMount() {
    // this.getUser();
  }
  getUser = async () => {
    try {
      const requestURL = `http://192.168.1.7:8000/login`;
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'mritunjay@bchurunway.com',
          password: 'm123!@#'
        })
      };
      const data = await request(requestURL, options);
      if (data.success) {
        await AsyncStorage.setItem('authToken', data.authToken);
        this.setState({ isLoggedIn: true });
      }
    }
    catch (e) {
      console.error(e)
    }
  };
  // componentDidMount() {
  //   AsyncStorage.getItem('auth_token').then((authToken) => {
  //     if (authToken) {
  //       this.setState({ isLoggedIn: true });
  //     } else {
  //       this.setState({ isLoggedIn: false });
  //     }
  //   });
  // }
  render() {
    if (this.state.isLoggedIn === false) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading loadingText='Getting UserId' />
        </View>
      );
    }
    return (
      <View>
        <Products />
      </View>
    );
  }
}
