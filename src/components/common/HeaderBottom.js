import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';

import variables from '../../styles/variables';

import { ACCENT_BLUE, MAIN_FONT, WHITE, BLACK } from '../../styles/constants';

let {width, height} = Dimensions.get('window');

export default class HeaderBottom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listActive: true,
    }
  }
  
  render(){
    const { katalogDoctor = false, search = false, islanguages = false, language, onChangeSearch, text, changeLang, togleClick } = this.props

    return(
      <View style={styles.bigContainer}>
        <View style={[styles.container, (islanguages)? {justifyContent: 'center'}: {}] }>
        {
          (katalogDoctor)?
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=> {this.setState({listActive: true}); togleClick(true)}} activeOpacity={0.6} style={styles.btn_list} >
            {
              (this.state.listActive)?
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/listBW.png')} />
              :     
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/listBB.png')} />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {this.setState({listActive: false}); togleClick(false)}} activeOpacity={0.6} style={styles.btn_block} >
            {
              (this.state.listActive)?
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/blockBB.png')} />
              :
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/blockBW.png')} />
            }
            </TouchableOpacity>
          </View>: <View style={[styles.btnContainer, (islanguages) ? {width: 0}: {}]}></View>
        }
        {
          (search)?
            <View style={styles.inputContainer}>
              <Image style={styles.searchIcon} resizeMode='contain' source={require('../../../assets/img/search-icon.png')} />
              <TextInput style={[styles.input]} placeholder='' onChangeText={(text) => onChangeSearch(text)}/>  
            </View>
          :<Text style={styles.text}>{text}</Text>
        }
        {
          (islanguages) ? (
            <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={()=>changeLang('kz')}
                style={{zIndex: 2}}
              >
                <Text style={(language === 'kz') ? styles.lang : styles.langActive}>KAZ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>changeLang('ru')}
              >
                <Text style={(language == 'ru') ? styles.lang : styles.langActive}>РУС</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>changeLang('en')}
              >
                <Text style={(language == 'en') ? styles.lang : styles.langActive}>ENG</Text>
              </TouchableOpacity>
            </View>
          ): null
        }
        </View>
        <View style={{alignItems: 'center', marginTop: -width+height/25, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
          <View style={styles.oval} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bigContainer: {
    width: '100%',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  container: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    height: 35,
    backgroundColor: ACCENT_BLUE,
    zIndex: 2,
	},
	btnContainer: {
    flexDirection: 'row',
    width: 80,
    paddingLeft: 3
	},
	btn_list: {
    top: 10,
    left: 8
	},
	btn_block: {
    top: 10,
    left: 10
	},
	text: {
    color: WHITE,
    top: 10,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.medium,
    lineHeight: 23,
    letterSpacing: 1
	},
	inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: width - 80,
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 5,
    left: 5,
    top: 13,
    width: 18, 
    height: 18
  },
	input: {
		width: width - 150,
    height: 25, 
    top: 10,
    padding: 0,
    paddingLeft: 30,
    paddingRight: 10,
		borderRadius: 5,
		backgroundColor: WHITE
	},
  oval: {
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: ACCENT_BLUE,
    transform: [
      {scaleX: 3}
    ]
  },
  langActive: {
    color: BLACK,
    margin: 5,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.medium,
    zIndex: 10
  },
  lang: {
    color: WHITE,
    margin: 5,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.medium,
    zIndex: 10
  },
});