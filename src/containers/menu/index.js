import React, { Component } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from "react-native";
import i18n from '../../i18n';
import MenuItem from '../../components/menu/MenuItem';

class DrawerMenu extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.closeDrawer();
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View style={styles.container}>
        <View>
            <View style={styles.header}>
                <Image
                style={{width: 30, height: 30}}
                resizeMode='contain'
                source={require('../../../assets/img/menu-user-ic.png')}
                />
                <Text style={styles.headerTxt}>Best Man Ever</Text>
            </View>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuMain')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuDoc')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuServ')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuPost')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuAnalize')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuCont')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuFuq')}/>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuSet')}/>
        </View>
        <View>
            <MenuItem onClick={() => navigate("authorization")} label={i18n.t('MenuExit')}/>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  headerTxt: {
    paddingVertical: 20,
  },
});

export default DrawerMenu