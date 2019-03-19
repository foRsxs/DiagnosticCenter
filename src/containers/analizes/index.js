import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Container, Content, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import AnalizesItem from '../../components/AnalizesItem'
import Header from '../../components/common/Header';

import styles from './styles.js';
import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';
import variables from '../../styles/variables';
const { medium } = variables.fSize;

class AnalizesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareLoading: false
    };
  }

  componentDidMount() {
    this.props.getAnalizes({ type: '_list' })
  }

  render() {
    const { t, isRequest, analizes_list } = this.props;
    const { shareLoading } = this.state;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={t('analizes:title')} navigation={this.props.navigation} />
        {(shareLoading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={ACCENT_BLUE} />
        </View>)}
        <Content style={styles.mainContent} contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {}}>
          {(isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) :
          (<List>
            {
              (analizes_list && analizes_list.length) ? (
                analizes_list.map((item, index) => (
                  <AnalizesItem
                    key={index}
                    headTxt={item.text}
                    dateTxt={item.dat_string}
                    pdf={item.pdf}
                    isLoading={(value) => this.setState({ shareLoading: value })}
                    onPress={() => {
                      this.props.navigation.navigate({
                        routeName: "analizesItem",
                        key: index,
                        params: {
                          res_id: item.res_id,
                          date: item.dat_string,
                          pdf: item.pdf,
                          headTxt: item.text,
                          dateTxt: item.dat_string
                        }
                      });
                    }}
                  />
                ))
              ) : (<Text style={{ textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT }}>{t('analizes:no_analizes_text')}</Text>)
            }
          </List>)}
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    analizes_list: state.content.analizes.list,
    isRequest: state.content.isRequest
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('analizes')(connect(mapStateToProps, mapDispatchToProps)(AnalizesScreen));
