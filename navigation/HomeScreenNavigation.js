import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './../pages/TabPages/HomeScreen';
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'
const HomeScreenNavigation = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Home Screen',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      }),
    },
  }
);

export default HomeScreenNavigation;
