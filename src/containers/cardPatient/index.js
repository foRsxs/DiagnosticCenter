import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Container, Content, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import AnalizesItem from '../../components/AnalizesItem'
import Header from '../../components/common/Header';

import { ACCENT_BLUE } from '../../styles/constants';

class CardPatientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shareLoading: false
    };
  }

  componentDidMount() {
    this.props.getHistory({ type: 'list' });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history_list !== this.props.history_list) this.setState({ loading: false });
  }

  render() {
    const { t, history_list } = this.props;
    const { loading, shareLoading } = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header backButton={true} text={t('patient:title')} navigation={this.props.navigation} />
        {(shareLoading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={ACCENT_BLUE} />
        </View>)}
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
          {(loading) && <ActivityIndicator size="large" color={ACCENT_BLUE} />}
          <List>
            {
              (!loading) && (
                (history_list && history_list.length) ? (
                  history_list.map((item, index) => (
                    <AnalizesItem
                      key={index}
                      headTxt={item.text}
                      dateTxt={item.dat}
                      pdf={item.pdf}
                      isLoading={(value) => this.setState({ shareLoading: value })}
                      onPress={() => {
                        this.props.navigation.navigate({
                          routeName: "cardPatientDetailScreen",
                          key: index,
                          params: {
                            keyid: item.keyid,
                            p_type: item.p_type,
                            pdf: item.pdf,
                            headTxt: item.text,
                            dateTxt: item.dat
                          }
                        });
                      }}
                    />
                  ))
                ) : (<Text>{t('history:no_histories_text')}</Text>)
              )
            }
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  loaderWrap: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps(state) {
  return {
    history_list: state.content.history.list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['patient','history'])(connect(mapStateToProps, mapDispatchToProps)(CardPatientScreen));
