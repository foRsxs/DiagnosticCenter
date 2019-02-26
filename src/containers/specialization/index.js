import React, { Component } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { Container, Content, View, Text, List } from 'native-base';
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
      loading: (props.orderDatas.specialities) ? false : true,
      specialities: props.orderDatas.specialities
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderDatas.specialities !== this.props.orderDatas.specialities ) {
      this.setState({ loading: false, specialities: this.props.orderDatas.specialities });
    }
  }

  handleChange = (value) => {    
    findElements = (item) => {
      return item.spec_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }

    this.setState({ specialities: this.props.orderDatas.specialities.filter(findElements)});
  }

  render() {
    const { loading, specialities } = this.state;
    const { t, order, setOrder, navigation, setOrderValue, setActiveTab } = this.props;

    return (
      <View>
        <View style={styles.mainContainer}>
          <Container contentContainerStyle={styles.mainContentContainer}>
            <Header backButton={true} search={true} navigation={this.props.navigation} onChangeSearch={this.handleChange} />
            <Content style={styles.content} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
              {(specialities.length > 0) && (
                <Text style={styles.title}>{t('createrecord:form.select_specialty')}</Text>
              )}
              <List>
                {
                  (loading) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> :
                    (
                      (specialities && specialities.length) ? (
                        specialities.map((item, index) => (
                          <SpecializationItem
                            key={index}
                            onClick={() => {
                              setOrderValue({spec: item.spec_name});
                              if (order.type === 1) {                                 
                                setActiveTab(0);
                                setOrder({spec_id: item.spec_id}, 'spec_id', 'doc'); 
                              } else {                                
                                setActiveTab(1);
                                setOrder({spec_id: item.spec_id}, 'spec_id');
                              } 
                              navigation.goBack()
                            }}
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
          </Container>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    orderDatas: state.content.orderDatas,
    order: state.content.order
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['faq', 'common'])(connect(mapStateToProps, mapDispatchToProps)(SpecializationScreen));