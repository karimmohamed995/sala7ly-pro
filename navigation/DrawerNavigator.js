import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreenNavigation from './HomeScreenNavigation';
import ServiceStack from '../navigation/ServiceStack';
import LogoutStack from '../navigation/LogoutStack';
import Tab from './../pages/TabPages/TabHelper';
const obj = {
  Home: {
    screen: HomeScreenNavigation,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },

  JobsHistory: {
    screen: Tab,
    navigationOptions: {
      drawerLabel: 'My Orders',
    },
  },
  Logout: {
    screen: LogoutStack,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerLockMode: 'locked-closed',
    },
  },
  ServiceSelection: {
    screen: ServiceStack,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
};

const DrawerNavigator = createDrawerNavigator(obj, {initialRouteName: 'Home'});

export default DrawerNavigator;
