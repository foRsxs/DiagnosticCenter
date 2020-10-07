import React, { Component } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { RNCamera } from 'react-native-camera';

import Header from '../../components/common/Header';
import styles from './styles';

import { APP_NAME } from '../../config';

class ScanCodeScreen extends Component {
	constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      showScanner: true,
      showResult: false,
      scanData: null
    }
  }

  async componentDidMount() {
    (Platform.OS === 'android') ? this.requestCameraPermission() : this.setState({ hasCameraPermission: true });
  }
  
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      this.setState({ hasCameraPermission: (granted === PermissionsAndroid.RESULTS.GRANTED) });
    } catch (err) {
      console.warn(err)
    }
  }
  
  renderScanner = () => {
    const { hasCameraPermission } = this.state;
    const { t } = this.props;

    return (
      <View style={styles.containerScanner}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={styles.closeBtn}>
          <Icon style={{ color: '#ffffff' }} type="Fontisto" name="close-a" />
        </TouchableOpacity>
        {
          !!hasCameraPermission ? (
            <RNCamera
              style={styles.cameraArea}
              type={RNCamera.Constants.Type.back}
              onBarCodeRead={this.onScan}
              ref={cam => this.camera = cam}
              captureAudio={false}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            >
              <View style={styles.barcodeArea} />
            </RNCamera>
          ) : (
            <Text style={styles.text}>
              {t('scanqrcode:no_doctor_text')}
            </Text>
          )
        }
      </View>
    );
  }

  onScan = e => {
    const { t, navigation } = this.props;
    let scanData = null;

    try {
      if (e.type == "QR_CODE" || e.type == "org.iso.QRCode") {
        scanData = JSON.parse(e.data);
      }
    } catch (err) {
      scanData = null;
      Alert.alert(
        APP_NAME, 
        t('scanqrcode:wrong_code'),
        [
          {text: t('common:actions.ok'), onPress: () => navigation.goBack() },
        ]
      );
    }

    this.setState({
      showScanner: false,
      showResult: true,
      scanData: scanData
    });
  };

  renderScannerResult = () => {
    const { t } = this.props;
    const { scanData } = this.state;

    if (!scanData) return false;

    return (
      <Container contentContainerStyle={styles.сontainerResult}>
        <Header backButton={true} text={t('scanqrcode:title')} navigation={this.props.navigation} />
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

export default withNamespaces(['common', 'scanqrcode'])(ScanCodeScreen);
