import { StackNavigator, DrawerNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../containers/home';
import AthorizationScreen from '../containers/authorization';
import DrawerMenu from '../containers/menu';
import SpecilizationScreen from '../containers/specilization';
import ServicesScreen from '../containers/services';
import SubServicesScreen from '../containers/subservices';
import QuestionsScreen from '../containers/questions';
import QuestionFormScreen from '../containers/questionForm';


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
    specilization: { 
        screen: SpecilizationScreen,
        navigationOptions: {
            header: null
        }
    },
    services: { 
        screen: ServicesScreen,
        navigationOptions: {
            header: null
        }
    },
    subservices: { 
        screen: SubServicesScreen,
        navigationOptions: {
            header: null
        }
    },
    questions: { 
        screen: QuestionsScreen,
        navigationOptions: {
            header: null
        }
    },
    questionForm: { 
        screen: QuestionFormScreen,
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