import React, {Component} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import {Container} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import i18n from '../../i18n';
import * as AuthActions from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormSend from '../../components/common/Form';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class FuqScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  getData = (info) => {
    console.log(info)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const {profile} = this.props;

    return (
      <Container>
        <KeyboardAwareScrollView  enableOnAndroid={true} keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}>
          <Header text="ОБРАТНАЯ СВЯЗЬ" navigation = {this.props.navigation}/>
          <HeaderBottom text="напишите нам" />
          <FormSend sendData={this.getData} email={profile.email}/>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.authorization.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FuqScreen)
