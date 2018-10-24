import { StackNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../containers/home';
import AthorizationScreen from '../containers/authorization';

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

const AppNavigator = createSwitchNavigator({
    Auth: Athorization,
    Home: MainScreenNavigator,
});

export default AppNavigator;