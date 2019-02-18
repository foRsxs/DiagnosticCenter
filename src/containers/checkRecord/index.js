import React, { Component } from 'react';
import { Container, View, Content, Text } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import CustomBtn from '../../components/common/CustomBtn';
import RecordingItem from '../../components/RecordingItem';
import styles from './styles';
import { ICON_SPEC_SMALL, ICON_SERVICE_SMALL, ICON_DOCTOR_SMALL, ICON_CALENDAR_SMALL, ICON_TIME_SMALL, ICON_PRICE_SMALL, ICON_NUMBER_SMALL } from '../../styles/images';

class CheckRecordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { navigate } = this.props.navigation;
        const { t } = this.props;
        return (
            <Container contentContainerStyle={styles.mainContainer}>
                <Header backButton={true} text={t('recordings:item.select_time')} navigation={this.props.navigation} />
                <Content>
                    <View style={styles.wrapper}>
                    <RecordingItem icon={ICON_SERVICE_SMALL} title={t('createrecord:form.service')} placeholder={t('createrecord:form.select_service')} />
                        <View style={styles.datetimeWrap}>
                            <View style={{ flex: 2 }}>
                                <RecordingItem icon={ICON_PRICE_SMALL} title={t('createrecord:price')} placeholder={t('createrecord:form.select_date')} />
                            </View>
                            <View style={styles.separator}></View>
                            <View style={{ flex: 1 }}>
                                <RecordingItem contentContainerStyle={{ paddingLeft: 10 }} icon={ICON_NUMBER_SMALL} title={t('createrecord:room_number')} placeholder='12:00' />
                            </View>
                        </View>
                        <RecordingItem icon={ICON_DOCTOR_SMALL} title={t('createrecord:form.doctor')} placeholder={t('createrecord:form.select_doctor')} />
                        <View style={styles.datetimeWrap}>
                            <View style={{ flex: 2 }}>
                                <RecordingItem icon={ICON_CALENDAR_SMALL} title={t('createrecord:form.date')} placeholder={t('createrecord:form.select_date')} />
                            </View>
                            <View style={styles.separator}></View>
                            <View style={{ flex: 1 }}>
                                <RecordingItem contentContainerStyle={{ paddingLeft: 10 }} icon={ICON_TIME_SMALL} title={t('createrecord:form.time')} placeholder='12:00' />
                            </View>
                        </View>
                    </View>
                    <View style={styles.helpText}>
                        <Text>{t('createrecord:help_text')}</Text>
                    </View>
                    <View style={styles.buttonWrap}>
                        <CustomBtn label={t('common:actions_text.check_data')} onClick={() => navigate('authorization')} />
                    </View>
                </Content >
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        order: state.content.order,
        orderDatas: state.content.orderDatas,
        lang_key: state.authorization.language
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ContentActions, dispatch)
}

export default withNamespaces(['createrecord', 'common'])(connect(mapStateToProps, mapDispatchToProps)(CheckRecordScreen));
