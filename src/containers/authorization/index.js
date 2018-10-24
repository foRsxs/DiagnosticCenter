import React, {Component} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {Text, Button} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CustomBtn from '../../components/CustomBtn'

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
                <CustomBtn label='Hello'/>
            </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  
});

export default AuthorizationScreen;
