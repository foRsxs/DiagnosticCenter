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
    const { katalogDoctor = false, search = false, sortBtn = false } = this.props
    return(
      <View style={styles.bigContainer}>
        <View style={styles.container}>
        {
          (this.props.katalogDoctor)?
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=> {this.setState({listActive: true}); this.props.togleClick(true)}} activeOpacity={0.6} style={styles.btn_list} >
            {
              (this.state.listActive)?
              <Image source={require('../../../assets/img/btn_list_w.png')} />:            
              <Image source={require('../../../assets/img/btn_list_b.png')} />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {this.setState({listActive: false}); this.props.togleClick(false)}} activeOpacity={0.6} style={styles.btn_block} >
            {
              (this.state.listActive)?
              <Image source={require('../../../assets/img/btn_block_b.png')} />:
              <Image source={require('../../../assets/img/btn_block_w.png')} />
            }
            </TouchableOpacity>
          </View>: <View style={styles.btnContainer}></View>
        }
          
          
          {
              (this.props.search)?
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='' onChangeText={(text) => this.props.onChange(text)}/>
                {
                  (this.props.katalogDoctor || this.props.sortBtn)?
                  <TouchableOpacity onPress={() => this.props.onClick()} activeOpacity={0.6} style={styles.btn_sort} >
                    <Image source={require('../../../assets/img/btn_sort.png')} />
                  </TouchableOpacity>: null
                }
                
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
    // flexWrap:'wrap', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    height: 40,
    backgroundColor: variables.colors.blue,
    zIndex: 2
	},
	btnContainer: {
		flexWrap:'wrap', 
    flexDirection: 'row',
    justifyContent: 'center', 
		width: '23%'
	},
	btn_list: {
		top: 15,
	},
	btn_block: {
		top: 15,
	},
	text: {
    color: variables.colors.white,
    top: 14,
    left: 12,
    fontFamily: variables.fonts.light,
    fontSize: variables.fSize.medium,
    lineHeight: 23,
    letterSpacing: 1
	},
	inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
		width: '75%'
	},
	input: {
		width: 225,
		height: 25, 
		padding: 0,
		top: 15,
		borderRadius: 5,
		backgroundColor: variables.colors.white
	},
	btn_sort: {
    top: 15,
  },
  oval: {
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: variables.colors.blue,
    transform: [
      {scaleX: 3}
    ]
  },
});