import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet, FlatList,Alert,TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
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
  Toast,
  Text
} from "native-base";
import { GetSurveyList,GetLanguageList,SaveQuestionAnswerResponse } from "../../service/SurveyService";
import { purpleColor,darkGrayColor,purple } from "../../Common/commonStyle";

import flatListData from "../../../data/flatListData";

import { getPushNotificationExpoTokenAsync } from "../../service/api/RegisterForPushNotificationsAsync";
import { RemoveDeviceToken } from "../../service/AccountService";

var surveyCompleteScreen;
class SurveyCompleteScreen extends Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const RequestId=navigation.getParam('RequestId','No valu is entered');
    const LanguageId=navigation.getParam('LanguageId','No value is entered for Language Id');
    const postArray=navigation.getParam('postArray','no value for PostArray');
    console.log(postArray,"const postArray");
 
    this.state = {
      LanguageId:LanguageId,
      RequestId: RequestId,
      postArray:postArray,
      id: null,
      loading: false,
      data: [],
      sendArray:[],
    };
    surveyCompleteScreen = this;
  }
  componentDidMount() {
  
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: "Finish Survey",
      headerStyle: { backgroundColor: purple},
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: null,
      // headerRight: (
      //   <Button style={{backgroundColor:'#ff99cc'}} onPress={() => surveyCompleteScreen._signOutAsync()}>
      //     <Text>Logout</Text>
      //   </Button>
      // )
    };
  };

  SaveResponse = () =>{
    let i=0;
    this.state.postArray.forEach(element => {
      this.state.sendArray.push({
        Id:i++,
        QuestionId:element.QuestionId,
        givenAnswerId:element.givenAnswerId,
        StartTime:element.StartTime,
        SerialNo:element.SerialNo,
      });
    });
    console.log(this.state.sendArray,"sendArray");
    this._saveResponse(this.state.sendArray,this.state.RequestId,this.state.LanguageId);
    };
  goPrevious=()=>{
    this.props.navigation.goBack();
  }
    async _saveResponse(postArray,RequestId,LanguageId){
      const UserId=await AsyncStorage.getItem("UserId");
      
      response=await SaveQuestionAnswerResponse(postArray,RequestId,LanguageId,UserId);
      console.log("Response",response);
      if (response && response.isSuccess) 
      {

      this.props.navigation.navigate("LanguageScreen",{
        isSurveyCompleted:true
      });
        // surveyCompleteScreen._signOutAsync();

        Toast.show({
          text: "Survey Successfully Submitted",
          buttonText: "Okay",
          type: "success",
          duration: 3000,
          position: "bottom"
        });
      } else {
        if (response) {
          Toast.show({
            text: response.message,
            buttonText: "Okay",
            type: "danger",
            duration: 3000,
            position: "bottom"
          });
        }
      }
    };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <Container>
        <View>
          {/* <View>
                <Text style={styles.noItem}>Please click on the complete button to finish or to continue to go to previous questions</Text>
          </View> */}
            <View style={styles.containerforButton}>
                <Button style={styles.button1} onPress={this.goPrevious}>
                  <Text>Previous</Text>
                </Button>
                <Button style={styles.button2} onPress={() => {
                      Alert.alert(
                        '',
                        'Do you Want to complete Survey?',
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                          {text: 'Yes', onPress: this.SaveResponse},
                        ],
                        { cancelable: false }
                      )
                        }}>
                <Text>Complete</Text>
                </Button>
              </View>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  noItem: {
    color: 'black',
    fontWeight:'bold',
    fontSize: 20,
    textAlign:'center',
    marginTop:40,
  },
  dropdownList:{
  },
  surveyButton:{
    backgroundColor: '#008000',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop:100,
    alignSelf:'center',
  },
  containerforButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:100,
  },
  button2: {
    width: '45%',
    height: 45,
    backgroundColor: '#008000',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  button1: {
    width: '45%',
    height: 45,
    backgroundColor: purple,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  }
  
});
export default SurveyCompleteScreen;
