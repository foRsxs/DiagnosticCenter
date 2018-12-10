import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import { withNamespaces } from 'react-i18next';

class СShare extends Component {
  constructor(props) {
    super(props);
  }

  async requestFilePermission(url, title, text, save) {
    const { t } = this.props;

    if (!url && !title) return;

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            'title': t('common:files.action_title'),
            'message': t('common:files.action_message')
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          (save) ? this.saveFile(url, title) : this.sharePDF(url, title, text);
        } else {
          Alert.alert(t('common:files.action_decline'));
        }
      } else {
        (save) ? this.saveFile(url, title) : this.sharePDF(url, title, text);
      }
    } catch (err) {
      console.warn(err)
    }
  }

  sharePDF(url, title, text) {

    let filePath = null;
    const { config, fs } = RNFetchBlob;
    const FileDir = (Platform.OS === 'android') ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
    const configOptions = {
      fileCache: true,
      path: `${FileDir}/${title}.pdf`
    };

    config(configOptions)
      .fetch('GET', url)
      .then(async resp => {
        filePath = resp.path();

        let options = {
          type: 'application/pdf',
          title: `${title} ${text}`,
          subject: text,
          url: (Platform.OS === 'android') ? 'file://' + filePath : filePath
        };
        await Share.open(options);
      });
  }

  render() {
    const { url, title, text } = this.props;

    return (
      <TouchableOpacity
        onPress={()=> this.requestFilePermission(url, title, text, false)}
        activeOpacity={0.8}
        style={styles.moreIcon}>
        <Image
          style={{width: 18, height: 20}}
          resizeMode='contain'
          source={require('../../../assets/img/more-icon.png')}
        />
      </TouchableOpacity>
    )
  }
}  

const styles = StyleSheet.create({ 
  moreIcon: {
    justifyContent: 'center',
    paddingLeft: 5,
    width: 25,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: 'transparent'
  }
});

export default withNamespaces('common')(СShare);