import { StackNavigator, DrawerNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../containers/home';
import AthorizationScreen from '../containers/authorization';
import DrawerMenu from '../containers/menu';


const Athorization = StackNavigator({
    authorization: { 
        screen: AthorizationScreen,
        navigationOptions: {
            header: null
        }
    },
});

const MainScreenNavigator = StackNavigator({
    home: { 
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
});

const Drawer = DrawerNavigator(
    {
      Main: { screen: MainScreenNavigator }
    },
    {
      contentComponent: DrawerMenu,
    }
  );

const AppNavigator = createSwitchNavigator({
    Auth: Athorization,
    Home: Drawer,
});

export default AppNavigator;