import React, { Component } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: false
    };
    this.senderResp = false;
  }

  onNavigationStateChange = ({ url }) => {

    const { navigation } = this.props;
    if (url.includes("logon")) {
      this.senderResp = true;
    }

    if (url.includes("err_process")) {
      if (this.senderResp) {
        setTimeout(() => {
          navigation.navigate("recordingList");
        }, 2000);
        this.senderResp = false;
      }
    }

    if (url.includes("process/result")) {
      if (this.senderResp) {
        setTimeout(() => {
          navigation.navigate("recordingList");
        }, 4000);
        this.senderResp = false;
      }
    }
  };

  render() {
    const { payLink } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: payLink }}          
          onNavigationStateChange={this.onNavigationStateChange}
          scalesPageToFit={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  payLink: state.content.payLink
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default compose(
  withNavigationFocus,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Payment);
