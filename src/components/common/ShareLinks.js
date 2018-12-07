import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import { withNamespaces } from 'react-i18next';

import variables from '../../styles/variables';

const { lightGray, mediumBlack, black } = variables.colors;
const { mainFont } = variables.fonts;
const { large, main } = variables.fSize;

class ShareLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async requestFilePermission(url, title, text) {
    if (!url && !title) return;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Сохранить файл',
          'message': 'Сохранить файл в хранилище'
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.saveFile(url, title, text);
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  
  saveFile = (url, title, text) => {
    const { config, fs } = RNFetchBlob;
    const FileDir = fs.dirs.DownloadDir;

    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager: true,
        notification: false,
        path: `${FileDir}/${title}.pdf`,
      }
    }

    config(options).fetch('GET', url).then((res) => {
      console.log(res)
    });
  }

  shareLink = (url, title, text) => {
    if (!url && !title) return;

    const shareOptions = {
      title: title,
      subject: text,
      url: url,
      social: Share.Social.EMAIL
    };
    Share.shareSingle(shareOptions);
  }

  render() {
    const { t, url, title, text } = this.props;

    return (
      <View style={{paddingLeft: '15%', paddingBottom: 10}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 10}}
          onPress={()=>this.shareLink(url, title, text)}
        >
          <View style={ styles.actionsWrap }>
            <Image
              style={ styles.actionsImg }
              resizeMode='contain'
              source={require('../../../assets/img/mail-icon.png')}
            />
            <Text style={{color: black, fontFamily: mainFont, fontSize: large}}>{ t('common:actions.send_to_mail') }</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{paddingVertical: 5, marginTop: 5}}
          onPress={()=> this.requestFilePermission(url, title, text)}
        >
          <View style={ styles.actionsWrap }>
            <Image
              style={ styles.actionsImg }
              resizeMode='contain'
              source={require('../../../assets/img/picture-icon.png')}
            />
            <Text style={{color: black, fontFamily: mainFont, fontSize: large}}>{ t('common:actions.save_to_gallery') }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapName: {
    backgroundColor: lightGray, 
    textAlign: 'center', 
    borderRadius: 10, 
    paddingHorizontal: 0, 
    paddingVertical: 10,
    marginHorizontal: 15
  },
  txtName: {
    color: black, 
    fontFamily: mainFont,
    fontSize: large, 
    width: '100%', 
    textAlign: 'center',
  },
  txtSubname: {
    color: mediumBlack, 
    fontFamily: mainFont,
    marginTop: 5,
    fontSize: main, 
    width: '100%', 
    textAlign: 'center'
  },
  actionsWrap: {
    justifyContent: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  actionsImg: {
    width: 20, 
    height: 15, 
    marginRight: 10
  },
  textWrap: {
    backgroundColor: 'white', 
    padding: 15, 
    marginTop: 10
  },
});

export default withNamespaces('common')(ShareLinks);