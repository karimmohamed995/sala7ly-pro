//This is an example of Tab inside Navigation Drawer in React Native//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components
 
import TabHelper from './TabPages/TabHelper';
 
export default class Screen1 extends Component {
  //Return Tab Navigator from here to render tab in option one of navigation drawer
  render() {
    return <TabHelper />;
  }
}