import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, FlatList} from 'react-native';

import variables from '../../styles/variables'
import NumberItem from '../common/NumberItem'

class InputNumber extends Component {
  render(){
    return(
      <View style={styles.container}>
			  <TextInput style={styles.input} onChangeText={(text)=> this.onChangeNumber(text)}/>
        <FlatList 
          data={[
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'},
            {key: '4', value: '4'},
            {key: '5', value: '5'},
            {key: '6', value: '6'},
            {key: '7', value: '7'},
            {key: '8', value: '8'},
            {key: '9', value: '9'},
            {key: 'x', value: 'x'},
            {key: '0', value: '0'},
						{key: '<', value: '4'},]}
					scrollEnabled={false}
          horizontal={false}
          vertical={true}
					numColumns={3}
					style={{width: 270, height: 360}}
          renderItem={({item}) => <NumberItem onClick={this.props.onClick} value={item.value} text={item.key}/>
          }
        />
				<Text style={styles.text}>не пришёл код?</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '75%'
	},
	input: {
		height: 50,
		fontSize: 45,
		lineHeight: 47,
		padding: 0,
		margin: 20
	},
	text: {
		fontSize: 18,
		color: variables.colors.darkBlue
	}
})
export default InputNumber
