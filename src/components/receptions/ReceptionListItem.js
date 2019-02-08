import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'native-base';
import { withNamespaces } from 'react-i18next';
import CShare from '../../components/common/CShare';

import variables from '../../styles/variables';
const { medium, normal, main } = variables.fSize;

import { BACKGROUND_BLUE, BLACK, ACCENT_BLUE, MAIN_FONT, RED, MEDIUM_BLACK } from '../../styles/constants';

class ReceptionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
    };
  }

  render() {
    const {t, pdf, headTxt, servTxt, timeTxt, nameTxt, docTxt, disable, onPress, isLoading} = this.props;

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
            {((!disable && pdf) && (<CShare url={pdf} title={`${docTxt} ${headTxt}`} text={timeTxt} isLoading={(value) => isLoading(value)}/>))}
          </View>
        </TouchableOpacity>
        { (disable) && (<Text style={styles.disableText}>{t('recordings:item.cancel_recording')}</Text>) }
      </View>
    );
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
  },
  receptionItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  receptionItemDisable: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: BACKGROUND_BLUE,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
    opacity: 0.5
  },
  txtHead: {
    color: BLACK,
    fontSize: medium
  },
  txtHeadServ: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    paddingTop: 3
  },
  txtTime: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: main
  },
  txtName: {
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    marginTop: 5
  },
  disableText: {
    textAlign: 'right',
    width: 50,
    height: 30,
    fontSize: normal,
    fontFamily: MAIN_FONT,
    color: RED,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

export default withNamespaces(['recordings', 'common'])(ReceptionListItem);