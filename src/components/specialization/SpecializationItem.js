import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class SpecializationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {imageUri, headTxt, subTxt} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        style={styles.specItem}
        >
        <View style={styles.itemWrap}>
          <Image
            style={styles.specIcon}
            resizeMode='contain'
            source={imageUri}
            fadeDuration={0}
          />
          <View style={styles.wrapTxt}>
            <Text style={styles.specItemText}>
                {headTxt}
            </Text>
            <Text style={styles.specItemSubText}>
                {subTxt}
            </Text>
          </View>
        </View>
        <View style={styles.arrowWrap}>
          <Icon ios='ios-arrow-forward' android="ios-arrow-forward" style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  specItem: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10
  },
  itemWrap: {
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'row', 
    width: '100%',
    position: 'relative',
    paddingRight: 20,
    paddingLeft: 50,
  },
  wrapTxt: {
    flexDirection: 'column',
  },
  specItemText: {
    fontSize: variables.fSize.medium,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.mediumBlack,
  },
  specItemSubText: {
    fontSize: variables.fSize.normal,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.darkGray,
  },
  specIcon: {
    position: 'absolute',
    top: '50%'-15,
    left: 10,
    width: 30, 
    height: 30,
  },
  arrowWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: variables.colors.red,
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10, 
    width: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color:'white',  
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.medium
  }
});