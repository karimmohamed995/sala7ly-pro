import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import Signup from '../pages/Signup';
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'
const LogoutStack = createStackNavigator(
  {
    Logout: {
      screen: Signup,
      navigationOptions: ({navigation}) => ({
        title: '',
      }),
    },
  }
);

export default LogoutStack ;
