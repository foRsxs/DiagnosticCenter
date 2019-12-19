import React, { Component } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Left, Right, Icon, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';

import styles from './styles';
import { ACCENT_BLUE } from '../../styles/constants';

class InfoScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getListInformation();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { t, isRequest, listInformation } = this.props;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={t('information:title')} navigation={this.props.navigation} />
        <Content style={styles.mainContent} contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {}}>
          <List>
            {(!!isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />)
              : ((listInformation && listInformation.length) ? (
                  listInformation.map((item, i) => (
                    <ListItem key={i} onPress={() => navigate({ routeName: 'informationItem', params: { header_title: item.title, post_id: item.id }, key: item.id })} style={styles.questionItem}>
                      <Left>
                        <Text style={styles.questionItemText}>{item.title}</Text>
                      </Left>
                      <Right>
                        <Icon style={styles.arrow} active name="ios-arrow-forward" />
                      </Right>
                    </ListItem>
                  ))
                ) : (<Text>{t('information:no_information_text')}</Text>)
              )
            }
          </List>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    listInformation: state.content.listInformation.list,
    isRequest: state.content.isRequest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('information')(connect(mapStateToProps, mapDispatchToProps)(InfoScreen));
