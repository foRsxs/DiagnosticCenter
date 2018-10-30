import React, {Component} from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import {Text, Button} from 'native-base';
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
        showSortList: false
    };
  }

  

  componentDidMount() {}

  change = (value) => {
      console.log('text', value)
      this.setState(state => ({showSortList: !state.showSortList}))
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props)
    return (
        <View>
        <View style={ this.state.showSortList? styles.opacityContainer :styles.mainContainer }>
            <Header text='Hello' navigation = {this.props.navigation}/>
            <HeaderBottom katalogDoctor = {true} text="Hello World" search={true} onClick={this.change}/>
            <View style={{flex: 1, top: 200}}>
            
                <Text>
                Auth 
                </Text>
                <Button rounded 
                onPress={()=>{ 
                    console.log(1);
                    navigate('home'); 
                }}>
                <Text>go home</Text>
                </Button>
                <CustomBtn  onClick={(value) => {console.log(this,value)}} label='Запросить код' />
            </View>
        </View>
            {
                (this.state.showSortList)?
                <SortList onClick={this.change}/>: null
            }
        </View>
      )
   }
}


const styles = StyleSheet.create({
  mainContainer: {
      opacity: 1
  },
  opacityContainer: {
      opacity: 0.1
  }
});

export default AuthorizationScreen;
