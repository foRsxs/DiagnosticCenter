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
    this.props.getAnalizes({ type: '_list' })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.analizes_list !== this.props.analizes_list) this.setState({ loading: false });
  }

  render() {
    const { t, analizes_list } = this.props;
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
                ) : (<Text>{t('patient:no_patient_text')}</Text>)
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
    analizes_list: state.content.analizes.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('patient')(connect(mapStateToProps, mapDispatchToProps)(CardPatientScreen));
