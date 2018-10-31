import { StackNavigator, DrawerNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../containers/home';
import AthorizationScreen from '../containers/authorization';
import DrawerMenu from '../containers/menu';
import SpecilizationScreen from '../containers/specilization';
import ServicesScreen from '../containers/services';
import SubServicesScreen from '../containers/subservices';
import QuestionsScreen from '../containers/questions';
import QuestionFormScreen from '../containers/questionForm';
import CatalogScreen from '../containers/catalog';
import OftenQuestionsScreen from '../containers/oftenquestions';
import ReceptionInfoScreen from '../containers/receptionInfo';
import ReceptionListScreen from '../containers/receptionList';
import AnalizesScreen from '../containers/analizes';
import ContactsScreen from '../containers/contacts';
import SettingsScreen from '../containers/settings';
import TextScreen from '../containers/textScreen';
import DoctorScreen from '../containers/cardDoc';
import CalendarDateScreen from '../containers/calendar/date';
import ReceptionsScreen from '../containers/receprions';
import TimeScreen from '../containers/time';

const Athorization = StackNavigator({
    authorization: { 
        screen: TimeScreen,
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
    catalog: { 
        screen: CatalogScreen,
        navigationOptions: {
            header: null
        }
    },
    oftenquestions: { 
        screen: OftenQuestionsScreen,
        navigationOptions: {
            header: null
        }
    },
    receptionInfo: { 
        screen: ReceptionInfoScreen,
        navigationOptions: {
            header: null
        }
    },
    receptionList: { 
        screen: ReceptionListScreen,
        navigationOptions: {
            header: null
        }
    },
    analizes: { 
        screen: AnalizesScreen,
        navigationOptions: {
            header: null
        }
    },
    contacts: { 
        screen: ContactsScreen,
        navigationOptions: {
            header: null
        }
    },
    settings: { 
        screen: SettingsScreen,
        navigationOptions: {
            header: null
        }
    },
    textScreen: { 
        screen: TextScreen,
        navigationOptions: {
            header: null
        }
    },
    cardDoc: { 
        screen: DoctorScreen,
        navigationOptions: {
            header: null
        }
    },
    calendarDate: { 
        screen: CalendarDateScreen,
        navigationOptions: {
            header: null
        }
    },
    receptions: { 
        screen: ReceptionsScreen,
        navigationOptions: {
            header: null
        }
    },
    time: { 
        screen: TimeScreen,
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