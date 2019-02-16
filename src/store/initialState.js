export const initialState = {
  auth: {
    token: null,
    confirmed_auth: false, //<--
    methods_auth: null,
    notify: true,
    pinCode: null,
    user: {},
    device_touch: false,
    device_face: false,
    isGuest: false, //<--,
    language: null
  },
  content: {
    network_connect: false,
    authMessage: null,
    ListSpecialization: null,
    listDoctors: [],
    sortedListDoctor: [],
    doctorData: null,
    sales: null,
    listInformation: {
      list: null,
      post: null
    },
    questions: {
      often: null,
      doctors: null
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
    orderDatas: {
      specialities: [],
      services: [],
      doctors: [],
      dates: [],
      times: []
    },
    orderCreated: false,
    orderDeleted: false,
    listTalons: null,
    history: {
      list: null,
      current: null
    },
    analizes: {
      list: null,
      current: null
    }
  }
}
