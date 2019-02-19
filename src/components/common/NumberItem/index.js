import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class NumberItem extends Component {
	constructor(props) {
		super(props);
		this.state = { pressStatus: false };
	}
	_onHideUnderlay() {
		this.setState({ pressStatus: false });
	}
	_onShowUnderlay() {
		this.setState({ pressStatus: true });
	}

	render() {
		let { pressStatus } = this.state;
		const { value, text } = this.props
		return (
			<View style={styles.wrapItem}>
				{
					(text !== 'x' && text !== '<') ?
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => this.props.onClick(value)}
							style={
								pressStatus
									? styles.ItemActive
									: styles.Item
							}
							onPressOut={this._onHideUnderlay.bind(this)}
							onPressIn={this._onShowUnderlay.bind(this)}
						>
							<Text style={pressStatus ? styles.TextActive : styles.Text}>
								{text}
							</Text>
						</TouchableOpacity> :
						<TouchableOpacity
							activeOpacity={1}
							style={{ width: 60, height: 60 }}
							onPress={() => this.props.onClick(value)}
							onPressOut={this._onHideUnderlay.bind(this)}
							onPressIn={this._onShowUnderlay.bind(this)}
						>
							<Text style={pressStatus ? styles.TextActive : styles.Text}>
								{text}
							</Text>
						</TouchableOpacity>
				}
			</View>
		)
	}
}

