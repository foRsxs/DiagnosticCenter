import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { withNamespaces } from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';

import Header from '../../components/common/Header';

import styles from './styles';
import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';
import variables from '../../styles/variables';
const { medium } = variables.fSize;

class ScanCodeScreen extends Component {
	constructor(props) {
    super(props);
    this.state = {
      showScanner: true,
      showResult: false,
      scanData: null
    }
	}
  
  renderScanner = () => {
    return (
      <View style={styles.containerScanner}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={styles.closeBtn}>
          <Icon style={{ color: '#ffffff' }} name="ios-close" />
        </TouchableOpacity>
        <QRCodeScanner
          showMarker={true}
          onRead={this.onScannerSuccess}
        />
      </View>
    );
  }

  onScannerSuccess = (e) => {
    this.setState({
      showScanner: false,
      showResult: true,
      scanData: (e.data) ? JSON.parse(e.data): null
    });
  }

  renderScannerResult = () => {
    const { t } = this.props;
    const { navigate } = this.props.navigation;
    const { scanData } = this.state;

    if (!scanData) return false;

    return (
      <Container contentContainerStyle={styles.сontainerResult}>
        <Header backButton={true} text={t('scanqrcode:title')} navigation={navigate} />
        <Content contentContainerStyle={styles.resultWrapper}>
          <View style={styles.itemFields}>
            <Text style={styles.itemTitle}>{t('scanqrcode:item.title')}</Text>
          </View>
          { 
            scanData.number && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.number')}:</Text>
                <Text>{scanData.number}</Text>
              </View>
          }
          { 
            scanData.date_begin && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.date_begin')}:</Text>
                <Text>{scanData.date_begin}</Text>
              </View>
          }
          { 
            scanData.date_end && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.date_end')}:</Text>
                <Text>{scanData.date_end}</Text>
              </View>
          }
          { 
            scanData.iin && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.iin')}:</Text>              
                <Text>{scanData.iin}</Text>
              </View>
          }
          { 
            scanData.lastname && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.lastname')}:</Text>            
                <Text>{scanData.lastname}</Text>
              </View>
          }
          { 
            scanData.firstname && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.firstname')}:</Text>
                <Text>{scanData.firstname}</Text>
              </View>
          }
          { 
            scanData.patronymic && 
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.patronymic')}:</Text>
                <Text>{scanData.patronymic}</Text>
              </View>
          }
          { 
            scanData.org_name &&
              <View style={styles.itemFields}>
                <Text style={styles.itemTitle}>{t('scanqrcode:item.org_name')}:</Text>
                <Text>{scanData.org_name}</Text>
              </View>
          }
        </Content>
      </Container>
    )
  }

	render() {
    const { showScanner, showResult } = this.state;

		return (
      <View style={styles.container}>
        { showScanner && this.renderScanner() }
        { showResult && this.renderScannerResult() }
      </View>
		);
	}
}

export default withNamespaces('scanqrcode')(ScanCodeScreen);
