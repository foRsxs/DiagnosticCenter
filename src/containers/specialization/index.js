import React, { Component } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import LinkBtn from '../../components/common/LinkBtn';
import Header from '../../components/common/Header';
import SpecializationItem from '../../components/SpecializationItem';
import Popup from '../../components/common/Popup';
import { APP_IMG_URL, CALL_CENTRE_TEL } from '../../config';

import styles from './styles';
import { ACCENT_BLUE } from '../../styles/constants';

class SpecializationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sorted_list_specialization: props.list_specialization,
      loading: (props.list_specialization) ? false : true
    };
  }

  handleChange = (value) => {
    const { list_specialization } = this.props;
    function findElements(item) {
      return item.spec_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
    this.setState({ sorted_list_specialization: list_specialization.filter(findElements) });
  }

  componentDidMount() {
    if (!this.props.list_specialization) this.props.getListSpecialization(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list_specialization !== this.props.list_specialization) this.setState({ sorted_list_specialization: this.props.list_specialization, loading: false });
  }

  call = () => {
    Linking.openURL(`tel:${CALL_CENTRE_TEL}`);
    this.setState({ modalVisible: false });
  }

  render() {
    const { modalVisible, sorted_list_specialization, loading } = this.state;
    const { t } = this.props;

    return (
      <View>
        <View style={styles.mainContainer}>
          <Container contentContainerStyle={styles.mainContentContainer}>
            <Header backButton={true} search={true} navigation={this.props.navigation} />
            <Content style={styles.content} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
              {(sorted_list_specialization && sorted_list_specialization.length) && (
                <Text style={styles.title}>{t('createrecord:form.select_specialty')}</Text>
              )}
              <List>
                {
                  (loading) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> :
                    (
                      (sorted_list_specialization && sorted_list_specialization.length) ? (
                        sorted_list_specialization.map((item, index) => (
                          <SpecializationItem
                            key={index}
                            //onClick={() => this.props.navigation.navigate({ routeName: 'listDoctors', params: { spec_id: item.spec_id }, key: item.spec_id })}
                            onClick={() => this.props.navigation.navigate('servicesDetail')}
                            headTxt={item.spec_name}
                            imageUri={`${APP_IMG_URL}/icons/${item.spec_id}.png`}
                            redArrow={true}
                          />
                        ))
                      ) : (
                          <Text style={styles.noText}>{t('specialization:no_doctor_text')}</Text>
                        )
                    )
                }
              </List>
            </Content >
            <LinkBtn label={t('specialization:no_doctor_choose_link_text')} onClick={() => this.setState({ modalVisible: true })} />
            <Popup
              show={modalVisible}
              firstText={t('specialization:form.fisrt_text')}
              secondText={t('specialization:form.last_text')}
              laberButton={t('common:actions.call')}
              actionButton={this.call}
              labelLink={t('common:actions.close')}
              actionLink={() => this.setState({ modalVisible: false })}
            />
          </Container>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    list_specialization: state.content.ListSpecialization,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['faq', 'common'])(connect(mapStateToProps, mapDispatchToProps)(SpecializationScreen));