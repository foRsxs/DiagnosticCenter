import React, { Component } from 'react';
import { ActivityIndicator,ScrollView } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
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
    super(props);
    this.state = {
      loading: true,
      spec_id: (props.navigation.state.params) ? props.navigation.state.params.spec_id : null,
      spec_value: (props.navigation.state.params) ? props.navigation.state.params.spec_value : null,
      isOrder: (props.navigation.state.params && props.navigation.state.params.isOrder) ? props.navigation.state.params.isOrder : false,
      services: props.orderDatas.services,
    };
  }

  componentDidMount() {
    const { spec_id } = this.state;

    if (spec_id) {
      this.props.getListServices(spec_id, 2);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderDatas.services !== this.props.orderDatas.services) { 
      this.setState({
        services: this.props.orderDatas.services,
        loading: false,
      });
    }
  }

  handleChange = (value) => {    
    findElements = (item) => {
      return item.text.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }

    this.setState({ services: this.props.orderDatas.services.filter(findElements)});
  }

  onClick = (serv) => {
    const { isOrder, spec_value, spec_id } = this.state;
    const { setOrderValue, setOrder, navigation } = this.props;

    if (isOrder) {
      setOrderValue({ serv: serv.text });
      setOrder({ servid: serv.servid }, 'servid');
      navigation.goBack()
    } else {
      console.log(spec_value, spec_id)
      navigation.navigate({
        key: serv.servid,
        routeName: 'recordingCreate',
        params: { spec_id, type: 2, spec_value, servid: serv.servid, serv_value: serv.text },
      });
    }
  }

  render() {
    const { loading, isOrder, services } = this.state;
    const { t } = this.props;
 
    return (
      <View>
        <View style={styles.mainContainer}>
          <Container contentContainerStyle={styles.mainContentContainer}>
            <Header backButton={true} search={true} navigation={this.props.navigation} onChangeSearch={this.handleChange} />
            <Content style={styles.content} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
              { (isOrder) && (<Text style={styles.title}>{t('createrecord:form.select_service')}</Text>) }
              {
                (loading && !isOrder) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> : ( 
                  <ScrollView>
                    {
                      services.map((item, index) => (
                        <SpecializationItem
                          key={index}
                          onClick={() => this.onClick(item)}
                          headTxt={item.text}
                          price={item.price}
                        />
                      ))
                    }
                  </ScrollView>
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