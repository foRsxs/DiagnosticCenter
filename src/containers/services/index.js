import React, { Component } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { Container, Content, View, Text, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../../actions/auth';
import * as ContentActions from '../../actions/content';
import { authAlert } from '../../utils/helpers';
import Header from '../../components/common/Header';
import SpecializationItem from '../../components/SpecializationItem';
import { APP_IMG_URL } from '../../config';

import styles from './styles';
import { ACCENT_BLUE } from '../../styles/constants';

class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sorted_list_specialization: props.list_specialization
    };
  }

  handleChange = (value) => {
    const { list_specialization } = this.props;

    if (!list_specialization) return;
    
    findElements = (item) => {
      return item.spec_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }

    this.setState({ sorted_list_specialization: list_specialization.filter(findElements) });
  }

  componentDidMount() {
    this.props.getListSpecialization(3);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list_specialization !== this.props.list_specialization) this.setState({ sorted_list_specialization: this.props.list_specialization });
  }

  onClick = (spec) => {
    const { t, navigation, isGuest, setAuthMessage, setActiveTab } = this.props;

    if (+spec.type === 1) {
      if (isGuest) {
        setAuthMessage(t(`common:actions_text.record_text`));
        authAlert(t, navigation);
      } else {
        setActiveTab(0);
        navigation.navigate({
          key: spec.spec_id,
          routeName: 'recordingCreate',
          params: { spec_id : spec.spec_id, type: 1, spec_value: spec.spec_name},
        });
      }
    } else {
      this.props.navigation.navigate({ routeName: 'servicesDetail', params: { spec_id: spec.spec_id, spec_value: spec.spec_name }, key: spec.spec_id })
    }
  }

  render() {
    const { sorted_list_specialization } = this.state;
    const { t, isRequest } = this.props;

    return (
      <View>
        <View style={styles.mainContainer}>
          <Container contentContainerStyle={styles.mainContentContainer}>
            <Header search={true} navigation={this.props.navigation} onChangeSearch={this.handleChange} />
            <Content style={styles.content} contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {}}>
              <List style={styles.list}>
                {
                  (isRequest) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> :
                    (
                      (sorted_list_specialization && sorted_list_specialization.length) ? (
                        sorted_list_specialization.map((item, index) => (
                          <SpecializationItem
                            key={index}
                            onClick={() => this.onClick(item)}
                            headTxt={item.spec_name}
                            imageUri={`${APP_IMG_URL}/icons/${item.spec_id}.png`}
                          />
                        ))
                      ) : (
                        <Text style={styles.noText}>{t('specialization:no_doctor_text')}</Text>
                      )
                    )
                }
              </List>
            </Content >
          </Container>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    list_specialization: state.content.ListSpecialization,
    isGuest: state.authorization.isGuest,
    isRequest: state.content.isRequest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...AuthActions, ...ContentActions}, dispatch)
}

export default withNamespaces(['faq', 'common'])(connect(mapStateToProps, mapDispatchToProps)(ServicesScreen));