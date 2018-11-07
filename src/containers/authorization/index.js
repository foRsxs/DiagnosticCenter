import React, {Component} from 'react';
import { StyleSheet, View, Alert, Dimensions, Image, TextInput, FlatList} from 'react-native';
import {Text, Button, Container} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import variables from '../../styles/variables'

import Header from '../../components/common/Header'
import HeaderBottom from '../../components/common/HeaderBottom'
import CustomBtn from '../../components/common/CustomBtn'
import SortList from '../../components/common/sortList/SortList'

import SplashScreen from 'react-native-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputNumber from '../../components/autorization/InputNumber'

class AuthorizationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showSortList: false,
        togleList: false,
				inputValue: '',
				rusOn: true,
				number: '',
				personalId: '',
				requestCode: false
    };
  }

  

  componentDidMount() {
    SplashScreen.hide();
  }

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
onChangeNumber=(value)=>{
	this.setState({number: value});
	console.log('text', value);
}
onChangeId=(value)=>{
	this.setState({personalId: value});
	console.log('personalId', value);
}
requestCode = () =>{
	this.setState({requestCode: true})
	console.log(this.state.requestCode)
}
  

  render() {
		const { navigate } = this.props.navigation;
		
    console.log(this.props)
    return (
			<Container style={styles.container}>
			{
				(!this.state.requestCode)?
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
					<KeyboardAwareScrollView style={{width: '100%', height: height-100,top: 30, paddingBotton: 30}}>
					  <View style={styles.content}>
					    <Text style={{textAlign: 'center', color: variables.colors.darkBlue, width: '100%'}}>областной {"\n"} консультативно диагностический {"\n"} медицинский центр</Text>
				      <TextInput style={styles.input} onChangeText={(text)=> this.onChangeNumber(text)}/>
				      <TextInput style={styles.input} onChangeText={(text)=> this.onChangeId(text)}/>
					    <CustomBtn label='Запросить код' onClick={this.requestCode}/>
				    </View> 
					</KeyboardAwareScrollView>
			  </Container> 
			:
			  <Container style={styles.container}>
			    <View style={styles.header}>
			    </View>
			    <View style={{alignItems: 'center', marginTop: -width+height/25, zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
				    <View style={styles.oval} />
			    </View>
			    <Text style={{left: width/2-90, top: 70, zIndex: 1, position: 'absolute', color: 'white', fontSize: variables.fSize.large}}>введите код из sms</Text>
			    <InputNumber />
		    </Container>
				
			}
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
	content: {
		top: 30,
		padding: 15,
		paddingBottom: 40,
		height: height-180,
		flexDirection: 'column',
		justifyContent: 'space-around',
		width: '100%',
		alignItems: 'center'
	},
	input: {
		// margin: 15,
		width: '97%',
		height: 50,
		paddingLeft: 10,
		paddingRight: 10,
		// margin:10,
		fontSize: variables.fSize.large,
		color: variables.colors.lightBlack,
		backgroundColor: 'rgba(78, 158, 255, 0.15)',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'rgba(112, 172, 245, 0.5)',
		
	}
});

export default AuthorizationScreen;
