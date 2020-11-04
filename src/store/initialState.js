export const initialState = {
  appParamsConfig: null,
  auth: {
    token: null,
    confirmed_auth: false,
    methods_auth: null,
    notify: true,
    pinCode: null,
    user: {},
    device_touch: false,
    device_face: false,
    isGuest: true,
    enableSecure: false,
    language: 'ru'
  },
  deviceInfo: {
    appParamsConfig: null,
  },
  content: {
    authMessage: null,
    ListSpecialization: [],
    listDoctors: [],
    listOfCards: [],
    payLink: '',
    sortedListDoctor: [],
    doctorData: [],
    sales: [],
    listInformation: {
      list: [],
      post: {}
    },
    listVacantion: {
      list: [],
      post: {}
    },
    questions: {
      often: [],
      doctors: []
    },
    newQuestion: {
      loading: false,
      status: false,
    },
    order: {
      type: null,
      spec_id: null,
      servid: null,
      docdep_id: null,
      date: null,
      time: null
    },
    orderValues: {
      spec_id: null,
      servid: null,
      docdep_id: null,
      date: null,
      time: null
    },
    orderDatas: {
      specialities: [],
      services: [],
      doctors: [],
      dates: [],
      times: []
    },
    orderCreated: false,
    orderDeleted: false,
    listTalons: [],
    infoListTalonInfo: null,
    history: {
      list: [],
      current: []
    },
    analizes: {
      list: [],
      current: []
    },
    hideScreen: false,
    activeTabIndex: 0,
    isRequest: false
  }
}
