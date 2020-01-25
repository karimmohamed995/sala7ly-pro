import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import JobsScreen from '../pages/JobsScreen';
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'
const JobsHistoryStack = createStackNavigator(
  {
    JobsHistory: {
      screen: JobsScreen,
      navigationOptions: ({navigation}) => ({
        title: 'My Orders',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      }),
    },
  }
);

export default JobsHistoryStack ;
