import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet, FlatList,Alert,TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";
import { GetSurveyList,GetLanguageList,GetSurveyAnswer } from "../../service/SurveyService";
import { purpleColor } from "../../Common/commonStyle";

import flatListData from "../../../data/flatListData";

import { getPushNotificationExpoTokenAsync } from "../../service/api/RegisterForPushNotificationsAsync";
import { RemoveDeviceToken } from "../../service/AccountService";

var surveyAnswerScreen;
class SurveyAnswerScreen extends Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const RequestId=navigation.getParam('RequestId','No valu is entered');
    const LanguageId=navigation.getParam("LanguageId",'No valu is entered');
 
    this.state = {
      requestId: RequestId,
      languageId:LanguageId,
      id: null,
      loading: false,
      data: []
    };
    surveyAnswerScreen = this;
  }
  componentDidMount() {
    this._getAnswerList(this.state.languageId);
  }
  async _getAnswerList(languageId) {
    this.setState({ loading: true });
    await GetSurveyAnswer(languageId)
      .then(res => {
        console.log(res.result);
        this.setState({
          data: res.result
        });
      })
      .catch(error => {
        console.log("error Occured");
      });
    this.setState({ loading: false });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Answering Options",
      headerTintColor: purpleColor,
      // headerRight: (
      //   <Button style={{backgroundColor:'#ff99cc'}} onPress={() => surveyAnswerScreen._signOutAsync()}>
      //     <Text>Logout</Text>
      //   </Button>
      // )
    };
  };


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1, marginTop: 22 }}>
          <FlatList
            keyExtractor={item => item.Id.toString()}
            data={this.state.data}
            renderItem={({ item, index }) => {
              return (
                    <FlatListItem item={item} index={index}>
                    </FlatListItem>

                );
            }}
          >
          </FlatList>
        </View>
      </Container>
    );
  }
}
class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.props.index % 2 == 0 ? '#99ccff' : '#ff99cc'
      }}>
          <Text style={styles.flatListItem}>{this.props.item.AnswerName}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  }
  
});
export default SurveyAnswerScreen;
