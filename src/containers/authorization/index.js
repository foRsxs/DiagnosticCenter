import React, {Component} from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import {Text, Button} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import variables from '../../styles/variables'

import Header from '../../components/common/Header'
import HeaderBottom from '../../components/common/HeaderBottom'
import CustomBtn from '../../components/common/CustomBtn'
import SortList from '../../components/common/SortList'

class AuthorizationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showSortList: false
    };
  }

  

  componentDidMount() {}

  togleSortList () {
      console.log(this)
    //   this.setState({showSortList: true})
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(1)
    return (
        <View style={ styles.mainContainer }>
            <Header text='Hello' navigation = {this.props.navigation}/>
            <HeaderBottom katalogDoctor = {true} text="Hello World" search={true} funk={this.togleSortList}/>
            {
                (this.state.showSortList)?
                <SortList />: null
            }
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
                <CustomBtn  label='Запросить код' />
            </View>
        </View>
      )
   }
}


const styles = StyleSheet.create({
  
});

export default AuthorizationScreen;
