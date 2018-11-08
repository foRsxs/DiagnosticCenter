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
              // <View style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5, width: 29, height: 25, padding: 4, paddingLeft: 6, backgroundColor: 'white'}}>
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/listBW.png')} />
              // </View>
              :
              // <View style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5, width: 29, height: 25, padding: 4, paddingLeft: 6, backgroundColor: '#3A80D4'}}>            
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/listBB.png')} />
              // </View>
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {this.setState({listActive: false}); this.props.togleClick(false)}} activeOpacity={0.6} style={styles.btn_block} >
            {
              (this.state.listActive)?
              // <View style={{borderTopRightRadius: 5, borderBottomRightRadius: 5, width: 29, height: 25, padding: 4, paddingLeft: 6, backgroundColor: '#3A80D4'}}>
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/blockBB.png')} />
              // </View>
              :
              // <View style={{borderTopRightRadius: 5, borderBottomRightRadius: 5, width: 29, height: 25, padding: 4, paddingLeft: 6, backgroundColor: 'white'}}>
                <Image style={{width: 29, height: 25, padding: 4, paddingLeft: 6}} source={require('../../../assets/img/blockBW.png')} />
              // </View>  
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
                    <Image style={{width: 29, height: 25, padding: 7}} source={require('../../../assets/img/sortList_btn.png')} />
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
    height: 35,
    backgroundColor: variables.colors.blue,
    zIndex: 2,
    // flex: 1
	},
	btnContainer: {
		// flexWrap:'wrap', 
    flexDirection: 'row',
    // justifyContent: 'center', 
		width: 80
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
    fontFamily: variables.fonts.light,
    fontSize: variables.fSize.medium,
    lineHeight: 23,
    letterSpacing: 1
	},
	inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
		width: width - 80
	},
	input: {
		width: width - 80 - 50,
    height: 25, 
		top: 10,
		borderRadius: 5,
		backgroundColor: variables.colors.white
	},
	btn_sort: {
    top: 10,
    right: 8
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