import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {H3, Content, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import variables from '../../styles/variables'

export default class HeaderBottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listActive: false
        }
      }
  render(){
    const { katalogDoctor = false, search = false } = this.props
    return(
      <View style={styles.container}>
      {
        (this.props.katalogDoctor)?
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={()=> this.setState({listActive: true})} activeOpacity={0.6} style={styles.btn_list} >
          {
            (this.state.listActive)?
            <Image source={require('../../../assets/img/btn_list_w.png')} />:            
            <Image source={require('../../../assets/img/btn_list_b.png')} />
          }
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.setState({listActive: false})} activeOpacity={0.6} style={styles.btn_block} >
          {
            (this.state.listActive)?
            <Image source={require('../../../assets/img/btn_block_b.png')} />:
            <Image source={require('../../../assets/img/btn_block_w.png')} />
          }
          </TouchableOpacity>
        </View>: <View style={styles.btnContainer}></View>
      }
        
        <TouchableOpacity style={styles.textContainer} >
        {
						(this.props.search)?
						<View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder='' />
						  <TouchableOpacity onPress={()=> this.setState({listActive: false})} activeOpacity={0.6} style={styles.btn_sort} >
							  <Image source={require('../../../assets/img/btn_sort.png')} />
						  </TouchableOpacity>
						</View>
            :<Text style={styles.text}>{this.props.text}</Text>
        } 
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap:'wrap', 
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
		width: 100
	},
	btn_list: {
		top: 15,
		left: 18,
	},
	btn_block: {
		top: 15,
		left: 20,
	},
	text: {
    color: variables.colors.white,
		top: 14,
		left: 12,
    fontFamily: variables.fonts.light,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 1
	},
	inputContainer: {
		flexWrap:'wrap', 
		flexDirection: 'row', 
		width: 300
	},
	input: {
		width: 225,
		height: 25, 
		padding: 0,
		top: 15,
		left: 5,
		borderRadius: 5,
		backgroundColor: variables.colors.white
	},
	btn_sort: {
		top: 15,
		left: 30
	}
});