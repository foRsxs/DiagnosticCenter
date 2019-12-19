import React, { Component, Fragment } from 'react';
import { Alert, Text, Image, TouchableOpacity } from 'react-native';
import { Container, View, Content } from 'native-base';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { withNamespaces } from 'react-i18next';
import { SwipeListView } from 'react-native-swipe-list-view';

import { getSavedCards, deleteCard, addCard, paymentBySavedCard, getLinkForPayment } from '../../actions/content';
import { ADD_NEW_CARD, BANK_CARD, BACK_GREEN } from '../../styles/images';
import Header from '../../components/common/Header';
import styles from './styles';

class PaymentCards extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type_text: ''
		};
	}

	componentDidMount() {
		this.props.getSavedCards();
	}

	componentDidUpdate(prevProps) {
		const { t, payLink, payLinkTimeout, isFocused, navigation } = this.props;
		const { type_text } = this.state;

		if (prevProps.payLink !== payLink && payLink && isFocused) {
			navigation.navigate('payment', { type: type_text });
		}

		if (prevProps.payLinkTimeout !== payLinkTimeout && payLinkTimeout && isFocused) {
			Alert.alert(
				t('payment:card_payment'),
				t('common:errors.payment_request_timeout'),
				[ { text: 'OK', onPress: () => navigation.replace('recordingList') } ],
				{ cancelable: false }
			);
		}
	}

	renderCards = () => {
		const { t, listOfCards, deleteCard, infoListTalonInfo, paymentBySavedCard } = this.props;

		return (
			<SwipeListView
				keyExtractor={(item) => item.card_id}
				data={listOfCards}
				renderItem={({ item }, rowMap) => {
					const { type, card_hash, card_id } = item;

					return (
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => {
								paymentBySavedCard(card_id, infoListTalonInfo.rnumb_id, infoListTalonInfo.price);
							}}
							style={styles.itemOfCardContainer}
						>
							<Image
								style={styles.itemOfCardImage}
								resizeMode="cover"
								source={{ uri: `http://89.218.154.86:8081/payment_systems/${type}.png` }}
							/>
							<Text style={styles.numberOfCard}>{card_hash}</Text>
							<Image style={styles.arrowLogo} resizeMode="contain" source={BACK_GREEN} />
						</TouchableOpacity>
					);
				}}
				disableRightSwipe
				renderHiddenItem={({ item }, rowMap) => {
					const { card_id } = item;

					return (
						<View style={styles.deleteContainer}>
							<TouchableOpacity onPress={() => deleteCard(card_id)} style={styles.deleteBtn}>
								<Text style={styles.deleteText}>{t('payment:delete_card')}</Text>
							</TouchableOpacity>
						</View>
					);
				}}
				leftOpenValue={0}
				rightOpenValue={-100}
			/>
		);
	};

	addCardClick = () => {
		this.setState({ type_text: 'add_cart' });
		this.props.addCard();
	};

	bankCardClick = () => {
		const { getLinkForPayment, infoListTalonInfo } = this.props;

		getLinkForPayment(infoListTalonInfo.rnumb_id, infoListTalonInfo.price);
	};

	render() {
		const { t, navigation, listOfCards } = this.props;
		return (
			<Container>
				<Header backButton={true} text={t('payment:card_payment')} navigation={navigation} />
				<Content style={styles.content}>
					{!!listOfCards &&
					listOfCards.length > 0 && (
						<Fragment>
							<View style={styles.itemElement}>
								<Text style={styles.textStyle}>{t('payment:payment_by_saved_card')}</Text>
							</View>
							{this.renderCards()}
						</Fragment>
					)}
					<View style={styles.addNewCardContainer}>
						<View style={styles.itemElement}>
							<Text style={styles.textStyle}>{t('payment:add_new_card')}</Text>
						</View>
						<TouchableOpacity style={styles.addNewCard} onPress={this.addCardClick}>
							<Image style={styles.addCardIcon} resizeMode="contain" source={ADD_NEW_CARD} />
							<Text style={styles.textItemStyle}>{t('payment:add_card')}</Text>
							<Image style={styles.arrowLogo} resizeMode="contain" source={BACK_GREEN} />
						</TouchableOpacity>
					</View>
					<View style={styles.bankCardContainer}>
						<View style={styles.itemElement}>
							<Text style={styles.textStyle}>{t('payment:payment_without_saving_a_card')}</Text>
						</View>
						<TouchableOpacity style={styles.bankCard} onPress={this.bankCardClick}>
							<Image style={styles.bankCardIcon} resizeMode="contain" source={BANK_CARD} />
							<Text style={styles.textItemStyle}>{t('payment:bank_card')}</Text>
							<Image style={styles.arrowLogo} resizeMode="contain" source={BACK_GREEN} />
						</TouchableOpacity>
					</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	listOfCards: state.content.listOfCards,
	payLink: state.content.payLink,
	payLinkTimeout: state.content.payLinkTimeout,
	infoListTalonInfo: state.content.infoListTalonInfo
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getSavedCards,
			deleteCard,
			addCard,
			paymentBySavedCard,
			getLinkForPayment
		},
		dispatch
	);

export default compose(
	withNamespaces([ 'payment', 'common' ]),
	withNavigationFocus,
	connect(mapStateToProps, mapDispatchToProps)
)(PaymentCards);
