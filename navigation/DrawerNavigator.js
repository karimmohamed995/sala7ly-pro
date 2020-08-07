import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreenNavigation from './HomeScreenNavigation';
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
};

const DrawerNavigator = createDrawerNavigator(obj, {initialRouteName: 'Home'});

export default DrawerNavigator;
