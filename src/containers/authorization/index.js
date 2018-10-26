import React, {Component} from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import {Text, Button} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import variables from '../../styles/variables'

import Header from '../../components/common/Header'
import CustomBtn from '../../components/common/CustomBtn'

class AuthorizationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  

  componentDidMount() {}


  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={ styles.mainContainer }>
            <Header text='Hello'/>
            <View style={{alignItems: 'center', marginTop: -width+height/25, zIndex: 1}}>
                <View style={styles.oval} />
            </View>
            <View style={{flex: 1}}>
                <Text>
                Auth 
                </Text>
                <Button rounded
                onPress={()=>{ 
                    navigate('home'); 
                }}>
                <Text>go home</Text>
                </Button>
                <CustomBtn label='Запросить код' />
            </View>
        </View>
      )
  }
}

let {width, height} = Dimensions.get('window')


const styles = StyleSheet.create({
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

export default AuthorizationScreen;
