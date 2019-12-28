import React from 'react';
import  {createStackNavigator}  from 'react-navigation-stack'
import Signup from './../pages/Signup'
import Login from './../pages/Login'
import NavigationDrawerStructure from './../navigation/index'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login ,navigationOptions: ({ navigation }) => ({
      title: 'Login',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    })},
    Signup: { screen: Signup ,navigationOptions: ({ navigation }) => ({
      title: 'Signup',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    })}
  },
  {
    initialRouteName: 'Signup',
    headerMode: 'none'
  }
)

export default AuthNavigation
