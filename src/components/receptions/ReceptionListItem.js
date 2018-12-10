import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'native-base';
import { withNamespaces } from 'react-i18next';

import CShare from '../../components/common/CShare';
import variables from '../../styles/variables';

const {accentBlue, black, backgroundBlue, mediumBlack, red} = variables.colors;
const {mainFont} = variables.fonts;
const { medium, normal, main } = variables.fSize;

class ReceptionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false
    };
  }

  render() {
    let {t, pdf, headTxt, servTxt, timeTxt, nameTxt, docTxt, disable, onPress} = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={() => onPress()}
          activeOpacity={0.8}
        >
          <View style={ disable ? styles.receptionItemDisable : styles.receptionItem }>
            <Text style={styles.txtTime}>{timeTxt}</Text>
            <View style={{flexDirection: 'row', alignItems:'center', flexWrap: 'wrap'}}>
              <Text style={styles.txtHead}>{headTxt}</Text>
              <Text style={styles.txtHeadServ}>({servTxt})</Text>
            </View>
            <Text style={styles.txtName}>{nameTxt}</Text>
            { (!disable && pdf) && (<CShare url={pdf} title={`${docTxt} ${headTxt}`} text={timeTxt} />)}
          </View>
        </TouchableOpacity>
        { (disable) && (<Text style={styles.disableText}>{t('recordings:item.cancel_recording')}</Text>) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receptionItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  receptionItemDisable: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
    opacity: 0.5
  },
  txtHead: {
    color: black,
    fontSize: medium
  },
  txtHeadServ: {
    color: black,
    fontFamily: mainFont,
    fontSize: normal,
    paddingTop: 3
  },
  txtTime: {
    color: accentBlue,
    fontFamily: mainFont,
    fontSize: main
  },
  txtName: {
    color: mediumBlack,
    fontFamily: mainFont,
    fontSize: normal,
    marginTop: 5
  },
  disableText: {
    textAlign: 'right',
    width: 50,
    height: 30,
    fontSize: normal,
    fontFamily: mainFont,
    color: red,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

export default withNamespaces(['recordings', 'common'])(ReceptionListItem);