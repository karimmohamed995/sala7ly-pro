import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import ServiceSelectionScreen from '../pages/ServiceSelectionScreen';
import NavigationDrawerStructure from '../components/NavigationDrawerStructure'
const ServiceStack = createStackNavigator(
  {
    ServiceSelection: {
      screen: ServiceSelectionScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Service Screen',
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      }),
    },
  }
);

export default ServiceStack;
