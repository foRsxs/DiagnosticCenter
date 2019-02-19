import React, { Component } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeScreen from '../containers/home';
import AuthorizationScreen from '../containers/authorization';
import SpecializationScreen from '../containers/specialization';
import QuestionsScreen from '../containers/questions/allQuestions';////////////Need delete
import QuestionFormScreen from '../containers/questions/createQuestion';
import OftenQuestionsScreen from '../containers/oftenQuestions';
import CatalogScreen from '../containers/listDoctors';
import DoctorScreen from '../containers/listDoctors/item';
import RecordingItemScreen from '../containers/recording/item';
import RecordingListScreen from '../containers/recording/list';
import RecordingCreateScreen from '../containers/recording';
import AnalizesScreen from '../containers/analizes_history/analizes';
import AnalizesItemScreen from '../containers/analizes_history/analizesItem';
import HistoryScreen from '../containers/analizes_history/history';
import HistoryItemScreen from '../containers/analizes_history/historyItem';
import ContactsScreen from '../containers/contacts';
import FaqScreen from '../containers/faq';
import SettingsScreen from '../containers/settings';
import InfoScreen from '../containers/information';
import InfoItemScreen from '../containers/informationItem';
import WelcomeScreen from '../containers/welcome';
import ProfileScreen from '../containers/profile';
import FooterTabs from '../components/common/FooterTabs';
import ServicesDetailScreen from '../containers/servicesDetail';
import ServicesScreen from '../containers/services';
import doctorsListScreen from '../containers/recording/doctorsList';
import DateScreen from '../containers/dateScreen';
import TimeScreen from '../containers/timeScreen';
import CheckRecordScreen from '../containers/checkRecord';
import CardPatientScreen from '../containers/cardPatient';
import CardPatientDetailScreen from '../containers/cardPatientDetail';

const ProfileNavigator = createStackNavigator(
  {
    welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      },
    },
    authorization: {
      screen: AuthorizationScreen,
      navigationOptions: {
        header: null
      }
    },
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    analizes: {
      screen: AnalizesScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    analizesItem: {
      screen: AnalizesItemScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    cardPatientScreen: {
      screen: CardPatientScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    cardPatientDetailScreen: {
      screen: CardPatientDetailScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    oftenQuestions: {
      screen: OftenQuestionsScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    contacts: {
      screen: ContactsScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    faq: {
      screen: FaqScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    information: {
      screen: InfoScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    informationItem: {
      screen: InfoItemScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
  },
);

const DoctorNavigator = createStackNavigator(
  {
    listDoctors: {
      screen: CatalogScreen,
      navigationOptions: {
        header: null
      }
    },
    doctor: {
      screen: DoctorScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    questionForm: {
      screen: QuestionFormScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    }
  },
);

const ServiceNavigator = createStackNavigator(
  {
    services: {
      screen: ServicesScreen,
      navigationOptions: {
        header: null
      }
    },
  },
);

const RecordNavigator = createStackNavigator(
  {
    recordingCreate: {
      screen: RecordingCreateScreen,
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
    doctorsList: {
      screen: doctorsListScreen,
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
    specialization: {
      screen: SpecializationScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    dateScreen: {
      screen: DateScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    timeScreen: {
      screen: TimeScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
    checkRecordScreen: {
      screen: CheckRecordScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false
      }
    },
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Profile: ProfileNavigator,
    Main: MainNavigator,
    Doctor: DoctorNavigator,
    Service: ServiceNavigator,
    Record: RecordNavigator,
  },
  {
    tabBarComponent: props => <FooterTabs props={props} />
  }
);

const AppNavigator = createAppContainer(AppTabNavigator);

export default AppNavigator;
