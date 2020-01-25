import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreenNavigation from './HomeScreenNavigation';
import ServiceStack from '../navigation/ServiceStack';
import JobsHistoryStack from '../navigation/JobsHistoryStack'
import LogoutStack from '../navigation/LogoutStack'
const obj = {
  Home: {
    screen: HomeScreenNavigation,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  
  JobsHistory: {
    screen: JobsHistoryStack,
    navigationOptions: {
      drawerLabel: 'My Orders',
    },
  },
  Logout: {
    screen: LogoutStack,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerLockMode: 'locked-closed'
    },
  },
  ServiceSelection: {
    screen: ServiceStack,
    navigationOptions: {
      drawerLabel: ()=>null,
    },
  }
 

};

    
    const DrawerNavigator = createDrawerNavigator(obj,{initialRouteName: 'Home',});

export default DrawerNavigator;
