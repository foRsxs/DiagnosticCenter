import React, {Component} from 'react';
import { StyleSheet, View, Alert, Dimensions, Image, TextInput} from 'react-native';
import {Text, Button, Container} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import variables from '../../styles/variables'

import Header from '../../components/common/Header'
import HeaderBottom from '../../components/common/HeaderBottom'
import CustomBtn from '../../components/common/CustomBtn'
import SortList from '../../components/common/sortList/SortList'

class AuthorizationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showSortList: false,
        togleList: false,
				inputValue: '',
				rusOn: true
    };
  }

  

  componentDidMount() {}

  togle = (value) => {
    console.log('togle', value)
    this.setState({togleList: value})
  }

  changeLang = () => {
      this.setState(state => ({rusOn: !state.rusOn}))
  }

  handleChange = (value) => {
    console.log('event', value)
    this.setState({inputValue: value})
}


  render() {
		const { navigate } = this.props.navigation;
		
    console.log(this.props)
    return (
      <Container style={styles.container}>
				<View style={styles.header}>
				</View>
				<View style={{alignItems: 'center', marginTop: -width+height/25, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
          <View style={styles.oval} />
        </View>
				<View style={{ flexDirection: 'row', left: width/2-43, top: 35, zIndex: 1, position: 'absolute'}}>
					<Text style={this.state.rusOn?styles.langOn:styles.langOf} onPress={this.changeLang}>РУС</Text>
					<Text style={styles.langOf}>|</Text>
					<Text style={this.state.rusOn?styles.langOf:styles.langOn} onPress={this.changeLang}>KAZ</Text>
				</View>
				<Image style={{ alignItems: 'center', left: width/2-55, top: 70, zIndex: 1, position: 'absolute'}} source={require('../../../assets/img/logo.png')} />
				<View style={styles.textBlock}>
					<Text style={{textAlign: 'center', color: variables.colors.darkBlue}}>областной {"\n"} консультативно диагностический {"\n"} медицинский центр</Text>
				</View>
				<View>
				  <TextInput style={styles.input} placeholder=''/>
				  <TextInput style={styles.input} placeholder=''/>
				</View>
      </Container>
      )
   }
}
let {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: variables.colors.white,
	},
	header: {
		width: '100%',
		height: 100,
		backgroundColor: variables.colors.blue
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
	langOn: {
		color: variables.colors.white,
		margin: 3
	},
	langOf: {
		color: variables.colors.darkBlue,
		margin: 3
	},
	logo: {
		position: 'absolute',
		zIndex: 10
	},
	textBlock: {
		top: 60,
		width: '100%'
	},
	input: {
		top: 60,
		width: 325,
		height: 50,
		backgroundColor: 'rgba(78, 158, 255, 0.15)'
	}
});

export default AuthorizationScreen;
