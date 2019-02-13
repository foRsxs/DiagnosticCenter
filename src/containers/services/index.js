import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, View } from 'native-base';
import { withNamespaces } from 'react-i18next';

import Header from '../../components/common/Header';
import SpecializationItem from '../../components/SpecializationItem';
import styles from './styles';

import { ACCENT_BLUE } from '../../styles/constants';

class ServicesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
      loading: false
    };
  }

  render() {
    const { serviceList, loading } = this.state;
    const { t } = this.props;

    return (
      <View>
        <View style={styles.mainContainer}>
          <Container contentContainerStyle={styles.mainContentContainer}>
            <Header search={true} />
            <Content style={styles.content} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
              {
                (loading) ? <ActivityIndicator size="large" color={ACCENT_BLUE} /> :
                  (
                    serviceList.map((item, index) => (
                      <SpecializationItem
                        key={index}
                        onClick={() => this.props.navigation.navigate('listDoctors')}
                        headTxt={item.text}
                        price={item.price}
                      />
                    ))
                  )
              }
            </Content >
          </Container>
        </View>
      </View>
    )
  }
}

export default withNamespaces(['faq', 'common'])(ServicesScreen);