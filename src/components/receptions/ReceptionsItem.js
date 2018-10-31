import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class ReceptionsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {pressStatus: false};
  }

  render() {
    let {pressStatus} = this.state;
    let {headTxt, dateTxt} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=> {
          if(pressStatus == false) {
            this.setState({ pressStatus: true });
          } else {
            this.setState({ pressStatus: false });
          }
        }}
        style={
          pressStatus
            ? styles.receptionsItemActive
            : styles.receptionsItem
          }
        >
        <Text style={ pressStatus ? styles.txtHeadActive : styles.txtHead }>{headTxt}</Text>
        <Text style={ pressStatus ? styles.txtDateActive : styles.txtDate }>{dateTxt}</Text>
        <View style={styles.priceBlock}>
          <Text style={ pressStatus ? styles.priceActive : styles.price }>2000</Text>
          <Text style={ pressStatus ? styles.priceUnitActive : styles.priceUnit }>KZT</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  receptionsItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10,
    padding: 10,
    paddingRight: 90,
    position: 'relative',
  },
  receptionsItemActive: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: variables.colors.wiolet,
    marginBottom: 10,
    padding: 10,
    paddingRight: 90,
    position: 'relative',
  },
  txtHead: {
    color: variables.colors.mediumBlack,
    fontSize: variables.fSize.large
  },
  txtDate: {
    color: variables.colors.lightBlack,
    fontSize: variables.fSize.normal
  },
  txtHeadActive: {
    color: 'white',
    fontSize: variables.fSize.large
  },
  txtDateActive: {
    color: 'white',
    fontSize: variables.fSize.normal
  },
  priceBlock: {
    width: 80, 
    height: '100%', 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    alignItems: 'flex-end'
  },
  price: {
    fontSize: variables.fSize.medium,
    color: variables.colors.blue
  },
  priceUnit: {
    fontSize: variables.fSize.main,
    color: variables.colors.blue
  },
  priceActive: {
    fontSize: variables.fSize.medium,
    color: 'white'
  },
  priceUnitActive: {
    fontSize: variables.fSize.main,
    color: 'white'
  }
});