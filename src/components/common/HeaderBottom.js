import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions, FlatList} from 'react-native';
import {H3, Content, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import variables from '../../styles/variables'

export default class HeaderBottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listActive: true,
            sortList: false
        }
      }
    
  render(){
    const { katalogDoctor = false, search = false } = this.props
    return(
      <View style={styles.bigContainer}>
        <View style={styles.container}>
        {
          (katalogDoctor)?
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=> {this.setState({listActive: true}); this.props.togleClick(true)}} activeOpacity={0.6} style={styles.btn_list} >
            {
              (this.state.listActive)?
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/listBW.png')} />
              :     
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/listBB.png')} />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {this.setState({listActive: false}); this.props.togleClick(false)}} activeOpacity={0.6} style={styles.btn_block} >
            {
              (this.state.listActive)?
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/blockBB.png')} />
              :
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/blockBW.png')} />
            }
            </TouchableOpacity>
          </View>: <View style={styles.btnContainer}></View>
        }
          {
            (search)?
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='' onChangeText={(text) => this.props.onChange(text)}/>  
            </View>
            :<Text style={styles.text}>{this.props.text}</Text>
          } 
        </View>
        <View style={{alignItems: 'center', marginTop: -width+height/25, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
          <View style={styles.oval} />
        </View>
      </View>
    )
  }
}
let {width, height} = Dimensions.get('window')
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
    backgroundColor: variables.colors.accentBlue,
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
    color: variables.colors.white,
    top: 10,
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.large,
    lineHeight: 23,
    letterSpacing: 1
	},
	inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
		width: width - 80
	},
	input: {
		width: width - 150,
    height: 25, 
    top: 10,
    padding: 0,
    paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: variables.colors.white
	},
  oval: {
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: variables.colors.accentBlue,
    transform: [
      {scaleX: 3}
    ]
  },
});