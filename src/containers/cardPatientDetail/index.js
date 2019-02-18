import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content } from 'native-base';
import { withNamespaces } from 'react-i18next';

import Header from '../../components/common/Header';
import ShareLinks from '../../components/common/ShareLinks';
import styles from './styles';

class CardPatientDetailScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}



	render() {
		const { loading } = this.state;
		const { t } = this.props;

		return (
			<Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
				<Header backButton={true} text={t('patient:protocol_vizit')} navigation={this.props.navigation} />
				<Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10, paddingHorizontal: 30 }} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
					<View style={styles.headBlock}>
						<Text style={styles.topText}>Узи акушерство</Text>
						<Text style={styles.bottomText}>07.11.2017</Text>
					</View>
					<Text style={[styles.boldText, {marginBottom: 20}]}>Планоавое Амбулаторний</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.boldText}>Врач: </Text>
						<Text style={styles.boldText}>Имя Пронек Прввлпавапрп</Text>
					</View>
					<View>
						<Text style={styles.boldText}>Результаты исследования: </Text>
						<Text style={styles.descText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
					</View>
				</Content>
				<ShareLinks url="http://89.218.154.86:8081/api/lab_research_pdf?api_token=Wo2wh8T21E5OW04E389lMgeelVbmliyq2NxT1A5iRmfEihpvUAg19xGfjoFm&res_id=1739864" title="Test" text="Test" />
			</Container>
		)
	}
}

export default withNamespaces('patient')(CardPatientDetailScreen);
