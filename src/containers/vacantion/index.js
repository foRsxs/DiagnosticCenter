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

class VacantionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getListVacantion();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listVacantion !== this.props.listVacantion) this.setState({ loading: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { t, listVacantion } = this.props;
    const { loading } = this.state;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={t('information:title')} navigation={this.props.navigation} />
        <Content style={styles.mainContent} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
          <List>
            {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} />}
            {
              (!loading) && (
                (listVacantion && listVacantion.length) ? (
                  listVacantion.map((item, i) => (
                    <ListItem key={i} onPress={() => navigate({ routeName: 'vacantionItem', params: { header_title: item.title, post_id: item.id }, key: item.id })} style={styles.questionItem}>
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
    listVacantion: state.content.listVacantion.list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('information')(connect(mapStateToProps, mapDispatchToProps)(VacantionScreen));
