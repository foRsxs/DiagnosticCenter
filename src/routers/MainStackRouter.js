import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeScreen from '../containers/home';
import AuthorizationScreen from '../containers/authorization';
import AuthMethodScreen from '../containers/authMethods';
import SpecializationScreen from '../containers/specialization';
import QuestionFormScreen from '../containers/questionForm';
import OftenQuestionsScreen from '../containers/oftenQuestions';
import CatalogScreen from '../containers/listDoctors';
import DoctorScreen from '../containers/listDoctors/item';
import RecordingItemScreen from '../containers/recording/item';
import RecordingListScreen from '../containers/recording/list';
import RecordingCreateScreen from '../containers/recording';
import PaymentCardsScreen from '../containers/paymentCards';
import AnalizesScreen from '../containers/analizes';
import AnalizesItemScreen from '../containers/analizes/item';
import ContactsScreen from '../containers/contacts';
import FaqScreen from '../containers/faq';
import SettingsScreen from '../containers/settings';
import InfoScreen from '../containers/information';
import InfoItemScreen from '../containers/informationItem';
import VacantionScreen from '../containers/vacantion';
import VacantionItemScreen from '../containers/vacantionItem';
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
import ScanCodeScreen from '../containers/scanCode';
import PaymentScreen from '../containers/payment';
import PaymentMethods from '../containers/paymentMethods';

const ProfileNavigator = createStackNavigator(
  {
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    authorization: {
      screen: AuthorizationScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    analizes: {
      screen: AnalizesScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    analizesItem: {
      screen: AnalizesItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    cardPatientScreen: {
      screen: CardPatientScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    cardPatientDetailScreen: {
      screen: CardPatientDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    recordingList: {
      screen: RecordingListScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    recordingItem: {
      screen: RecordingItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    paymentMethods: {
      screen: PaymentMethods,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    paymentCards: {
      screen: PaymentCardsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    payment: {
      screen: PaymentScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
  },
  {
    initialRouteName: 'profile',
  }
);

ProfileNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  if (routeName === 'analizes' || routeName === 'analizesItem' || routeName === 'settings' 
    || routeName === 'cardPatientScreen' || routeName === 'cardPatientDetailScreen'
    || routeName === 'recordingList' || routeName === 'recordingItem') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const MainNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    oftenQuestions: {
      screen: OftenQuestionsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    contacts: {
      screen: ContactsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    faq: {
      screen: FaqScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    scanCode: {
      screen: ScanCodeScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    information: {
      screen: InfoScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    informationItem: {
      screen: InfoItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    vacantion: {
      screen: VacantionScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    vacantionItem: {
      screen: VacantionItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
  },
  {
    initialRouteName: 'home',
  }
);

MainNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  if (routeName === 'oftenQuestions' || routeName === 'contacts' || routeName === 'faq'
    || routeName === 'information' || routeName === 'informationItem' || routeName === 'scanCode') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const DoctorNavigator = createStackNavigator(
  {
    listDoctors: {
      screen: CatalogScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    doctor: {
      screen: DoctorScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    questionForm: {
      screen: QuestionFormScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    }
  },
  {
    initialRouteName: 'listDoctors',
  }
);

DoctorNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === 'doctor' || routeName === 'questionForm') {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const ServiceNavigator = createStackNavigator(
  {
    services: {
      screen: ServicesScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
  },
  {
    initialRouteName: 'services',
  }
);

const RecordNavigator = createStackNavigator(
  {
    recordingCreate: {
      screen: RecordingCreateScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    recordingList: {
      screen: RecordingListScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    doctorsList: {
      screen: doctorsListScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    recordingItem: {
      screen: RecordingItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    specialization: {
      screen: SpecializationScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    dateScreen: {
      screen: DateScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    timeScreen: {
      screen: TimeScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
    checkRecordScreen: {
      screen: CheckRecordScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
      }
    },
  },
  {
    initialRouteName: 'recordingCreate',
  }
);

RecordNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  
  if (routeName === 'specialization' || routeName === 'servicesDetail' || routeName === 'dateScreen'
    || routeName === 'timeScreen' || routeName === 'checkRecordScreen' || routeName === 'recordingList'
    || routeName === 'recordingItem') {
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
    tabBarComponent: props => <FooterTabs props={props} />,
    initialRouteName: 'Main',
  }
);

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: WelcomeScreen,
    AuthMethods: AuthMethodScreen,
    App: AppTabNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppNavigator;
