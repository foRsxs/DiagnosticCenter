import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../containers/home';
import AthorizationScreen from '../containers/authorization';
import DrawerMenu from '../containers/menu';
import SpecializationScreen from '../containers/specialization';
import QuestionsScreen from '../containers/questions/allQuestions';
import QuestionFormScreen from '../containers/questions/createQuestion';
import OftenQuestionsScreen from '../containers/questions/oftenQuestions';
import CatalogScreen from '../containers/listDoctors';
import DoctorScreen from '../containers/listDoctors/item';
import RecordingItemScreen from '../containers/recording/item';
import RecordingListScreen from '../containers/recording/list';
import RecordingCreateScreen from '../containers/recording/createRecording';
import AnalizesScreen from '../containers/analizes_history/analizes';
import AnalizesItemScreen from '../containers/analizes_history/analizesItem';
import HistoryScreen from '../containers/analizes_history/history';
import HistoryItemScreen from '../containers/analizes_history/historyItem';
import ContactsScreen from '../containers/contacts';
import FaqScreen from '../containers/contacts/faq';
import SettingsScreen from '../containers/settings';
import InfoScreen from '../containers/information';
import InfoItemScreen from '../containers/information/item';

const Athorization = createStackNavigator({
    authorization: { 
        screen: AthorizationScreen,
        navigationOptions: {
            header: null
        }
    },
});

const MainScreenNavigator = createStackNavigator({
    home: { 
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    specialization: { 
        screen: SpecializationScreen,
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
    oftenQuestions: { 
        screen: OftenQuestionsScreen,
        navigationOptions: {
            header: null
        }
    },
    recordingCreate: { 
        screen: RecordingCreateScreen,
        navigationOptions: {
            header: null
        }
    },
    recordingItem: { 
        screen: RecordingItemScreen,
        navigationOptions: {
            header: null
        }
    },
    recordingList: { 
        screen: RecordingListScreen,
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
    analizesItem: { 
        screen: AnalizesItemScreen,
        navigationOptions: {
            header: null
        }
    },
    history: { 
        screen: HistoryScreen,
        navigationOptions: {
            header: null
        }
    },
    historyItem: { 
        screen: HistoryItemScreen,
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
    doctor: { 
        screen: DoctorScreen,
        navigationOptions: {
            header: null
        }
    },
    listDoctors: { 
        screen: CatalogScreen,
        navigationOptions: {
            header: null
        }
    },
    faq: { 
        screen: FaqScreen,
        navigationOptions: {
            header: null
        }
    },
    information: { 
        screen: InfoScreen,
        navigationOptions: {
            header: null
        }
    },
    informationItem: { 
        screen: InfoItemScreen,
        navigationOptions: {
            header: null
        }
    },
});

const Drawer = createDrawerNavigator(
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