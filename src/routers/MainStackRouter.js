import React, { Component } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import HomeScreen from '../containers/home';
import AuthorizationScreen from '../containers/authorization';
import SpecializationScreen from '../containers/specialization';
import QuestionsScreen from '../containers/questions/allQuestions';
import QuestionFormScreen from '../containers/questions/createQuestion';
import OftenQuestionsScreen from '../containers/oftenQuestions';
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
import WelcomeScreen from '../containers/welcome';
import ProfileScreen from '../containers/profile';
import FooterTabs from '../components/common/FooterTabs';
import ServicesDetailScreen from '../containers/servicesDetail';
import ServicesScreen from '../containers/services';

const ProfileNavigator = createBottomTabNavigator(
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
        header: null
      }
    },
    analizesItem: {
      screen: AnalizesItemScreen,
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
  },
  {
    tabBarComponent: props => <FooterTabs props={props} />
  }
);

const MainNavigator = createBottomTabNavigator(
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
        header: null
      }
    },
    contacts: {
      screen: ContactsScreen,
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
  },
  {
    tabBarComponent: props => <FooterTabs props={props} />
  }
);

const DoctorNavigator = createBottomTabNavigator(
  {
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
  },
  {
    tabBarComponent: props => <FooterTabs props={props} />
  }
);

const ServiceNavigator = createBottomTabNavigator(
  {
    services: {
      screen: ServicesScreen,
      navigationOptions: {
        header: null
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    tabBarComponent: props => <FooterTabs props={props} />
  }
);

const RecordNavigator = createBottomTabNavigator(
  {
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
    faq: {
      screen: FaqScreen,
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
        header: null
      }
    },
  },
  {
    tabBarComponent: props => <FooterTabs props={props} />
  }
);

const AppNavigator = createAppContainer(createSwitchNavigator({
  Profile: ProfileNavigator,
  Main: MainNavigator,
  Doctor: DoctorNavigator,
  Service: ServiceNavigator,
  Record: RecordNavigator,
},
  {
    initialRouteName: 'Profile',
  },
));

export default AppNavigator;
