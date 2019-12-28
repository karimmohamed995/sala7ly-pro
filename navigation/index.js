import AuthNavigation from './AuthNavigation';
import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import DrawerNavigator from '../navigation/DrawerNavigator'

const MainNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: DrawerNavigator,
  },{
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
