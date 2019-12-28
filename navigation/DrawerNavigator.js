import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreenNavigation from './HomeScreenNavigation';
import ServiceStack from '../navigation/ServiceStack';

const obj = {
  Home: {
    screen: HomeScreenNavigation,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  
  ServiceSelection: {
    screen: ServiceStack,
    navigationOptions: {
      drawerLabel: 'Services',
    },
  },

  
};

const DrawerNavigator = createDrawerNavigator(obj);

export default DrawerNavigator;
