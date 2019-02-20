import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, View, Text, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import SpecializationItem from '../../components/SpecializationItem';
import styles from './styles';

import { ACCENT_BLUE } from '../../styles/constants';

class ServicesDetailScreen extends Component {

  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      modalVisible: false,
      loading: (props.orderDatas.services) ? false : true,
      serviceList: [
        {
          text: 'МРТ головы',
          price: 1000
        },
        {
          text: 'МРТ брюшной полости',
          price: 1000
        }
      ],
      isOrder: (props.navigation.state.params && props.navigation.state.params.isOrder) ? props.navigation.state.params.isOrder : false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderDatas.services !== this.props.orderDatas.services) this.setState({ loading: false });
  }

  render() {
    const { serviceList, loading, isOrder } = this.state;
    const { t, orderDatas, order, setOrder, navigation, setOrderValue } = this.props;

    return (
      <View>
        <View style={styles.mainContainer}>
          <Container contentContainerStyle={styles.mainContentContainer}>
            <Header backButton={true} search={true} navigation={this.props.navigation} />
            <Content style={styles.content} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
              <Text style={styles.title}>{t('createrecord:form.select_service')}</Text>
              {
                (isOrder) ? (
                  <List>
                    {
                      (loading) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> :
                        (
                          orderDatas.services.map((item, index) => (
                            <SpecializationItem
                              key={index}
                              onClick={() => {
                                setOrderValue({ serv: item.text });
                                setOrder({ servid: item.servid }, 'servid');
                                navigation.goBack()
                              }}
                              headTxt={item.text}
                              price={item.price}
                            />
                          ))
                        )
                    }
                  </List>
                ) : (
                    <List>
                      {
                        (loading) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> :
                          (
                            serviceList.map((item, index) => (
                              <SpecializationItem
                                key={index}
                                headTxt={item.text}
                                price={item.price}
                              />
                            ))
                          )
                      }
                    </List>
                  )
              }

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

export default withNamespaces('createrecord')(connect(mapStateToProps, mapDispatchToProps)(ServicesDetailScreen));