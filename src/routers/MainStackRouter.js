import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeScreen from '../containers/home';
import AuthorizationScreen from '../containers/authorization';
import SpecializationScreen from '../containers/specialization';
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

const AuthNavigator = createStackNavigator(
  {
    authorization: {
      screen: AuthorizationScreen,
      navigationOptions: {
        header: null
      }
    },
  }
);

const ProfileNavigator = createStackNavigator(
  {
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
    cardPatientScreen: {
      screen: CardPatientScreen,
      navigationOptions: {
        header: null
      }
    },
    cardPatientDetailScreen: {
      screen: CardPatientDetailScreen,
      navigationOptions: {
        header: null
      }
    },
  },
);

ProfileNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  if (routeName === 'analizes' || routeName === 'analizesItem' || routeName === 'settings' 
    || routeName === 'cardPatientScreen' || routeName === 'cardPatientDetailScreen') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

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
        header: null
      }
    },
    contacts: {
      screen: ContactsScreen,
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
  },
);

MainNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  if (routeName === 'oftenQuestions' || routeName === 'contacts' || routeName === 'faq'
    || routeName === 'information' || routeName === 'informationItem') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

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
        header: null
      }
    },
    questionForm: {
      screen: QuestionFormScreen,
      navigationOptions: {
        header: null
      }
    }
  },
);

DoctorNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'doctor') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

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
        header: null
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null
      }
    },
    dateScreen: {
      screen: DateScreen,
      navigationOptions: {
        header: null
      }
    },
    timeScreen: {
      screen: TimeScreen,
      navigationOptions: {
        header: null
      }
    },
    checkRecordScreen: {
      screen: CheckRecordScreen,
      navigationOptions: {
        header: null
      }
    },
  },
);

RecordNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  if (routeName === 'specialization' || routeName === 'servicesDetail' || routeName === 'dateScreen'
    || routeName === 'timeScreen' || routeName === 'checkRecordScreen') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

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

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: WelcomeScreen,
    Auth: AuthNavigator,
    App: AppTabNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppNavigator;
