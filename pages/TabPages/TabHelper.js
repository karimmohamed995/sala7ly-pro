import React from 'react';
import {
  createAppContainer
} from 'react-navigation';

import {
  createStackNavigator
} from 'react-navigation-stack';
 
 
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
//Import all the screens for Tab
import JobsScreen from './../JobsScreen';
import HistoryScreen from './../HistoryScreen';
import NavigationDrawerStructure from '../../components/NavigationDrawerStructure'
 
const TabScreen = createMaterialTopTabNavigator(
  {
    Job: { screen: JobsScreen },
    history: { screen: HistoryScreen },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#FF9800',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);
const TabHelper = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Home Screen',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
    }),
  },
});
export default createAppContainer(TabHelper);