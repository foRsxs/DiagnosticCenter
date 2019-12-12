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
        gesturesEnabled: false
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
        gesturesEnabled: false
      }
    },
    analizesItem: {
      screen: AnalizesItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    cardPatientScreen: {
      screen: CardPatientScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    cardPatientDetailScreen: {
      screen: CardPatientDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    recordingList: {
      screen: RecordingListScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    recordingItem: {
      screen: RecordingItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    paymentMethods: {
      screen: PaymentMethods,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    paymentCards: {
      screen: PaymentCardsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    payment: {
      screen: PaymentScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
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
        gesturesEnabled: false
      }
    },
    oftenQuestions: {
      screen: OftenQuestionsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    contacts: {
      screen: ContactsScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    faq: {
      screen: FaqScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    scanCode: {
      screen: ScanCodeScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    information: {
      screen: InfoScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    informationItem: {
      screen: InfoItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    vacantion: {
      screen: VacantionScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    vacantionItem: {
      screen: VacantionItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
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
        gesturesEnabled: false
      }
    },
    doctor: {
      screen: DoctorScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    questionForm: {
      screen: QuestionFormScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
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
        gesturesEnabled: false
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
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
        gesturesEnabled: false
      }
    },
    recordingList: {
      screen: RecordingListScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    doctorsList: {
      screen: doctorsListScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    recordingItem: {
      screen: RecordingItemScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    specialization: {
      screen: SpecializationScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    servicesDetail: {
      screen: ServicesDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    dateScreen: {
      screen: DateScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    timeScreen: {
      screen: TimeScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    checkRecordScreen: {
      screen: CheckRecordScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
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
