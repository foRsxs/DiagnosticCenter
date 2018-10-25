import { StackNavigator, DrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Dimensions } from 'react-native'

import HomeScreen from '../containers/home';
import AthorizationScreen from '../containers/authorization';
import DrawerMenu from '../containers/menu';

let Dheight = Dimensions.get('window').height;
let Dwidth = Dimensions.get('window').width;

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
      drawerWidth: Dwidth/1.5
    }
  );

const AppNavigator = createSwitchNavigator({
    Auth: Athorization,
    Home: Drawer,
});

export default AppNavigator;