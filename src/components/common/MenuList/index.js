import React, { Component } from 'react';
import {Image} from 'react-native';
import {ListItem, Left, Body, Right, Text, Icon} from 'native-base';
import styles from './styles';

class MenuList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {

		const { fields, navigation } = this.props;

		return (
			fields.map((x, i) => (
				<ListItem key={i} onPress={() => navigation.navigate(x.link)} style={styles.listWrap}>
				  <Left>
						<Image
							resizeMode='contain'
							style={styles.listIcon}
							source={x.icon}
						/>
						<Text style={styles.listText}>{x.text}</Text>
				  </Left>
				  <Right>
						<Icon active name="ios-arrow-forward" />
				  </Right>
				</ListItem>
			))
		);
	}
}

export default MenuList
