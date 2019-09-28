import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet, FlatList,Alert,TouchableOpacity,ActivityIndicator } from "react-native";
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
  Text,
  Toast
} from "native-base";
import { GetSurveyList,GetLanguageList } from "../../service/SurveyService";
import { purpleColor,darkGrayColor,purple } from "../../Common/commonStyle";

import flatListData from "../../../data/flatListData";

import { getPushNotificationExpoTokenAsync } from "../../service/api/RegisterForPushNotificationsAsync";
import { RemoveDeviceToken } from "../../service/AccountService";

var languageScreen;
class LanguageScreen extends Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const isSurveyCompleted=navigation.getParam('isSurveyCompleted'); 
    this.state = {
      LanguageId:0,
      requestId: 0,
      IdforSurveyList:null,
      id: null,
      loading: false,
      data: [],
      SurveyListdata:[],
    };
    languageScreen = this;
  }
  componentDidMount() {
    this._getSurveyList(this.state.IdforSurveyList);
    this._getLanguageList(this.state.id);
  }
  componentWillReceiveProps(){
    const isSurveyCompleted=this.props.navigation.getParam('isSurveyCompleted','no value intered');
    if(isSurveyCompleted){
      this._getSurveyList(this.state.IdforSurveyList);
      this._getLanguageList(this.state.id);
    }
  }
  async _getSurveyList(id) {
    this.setState({ loading: true });


    const UserId=await AsyncStorage.getItem("UserId");

    await GetSurveyList(UserId)
      .then(res => {

        this.setState({
          SurveyListdata: res.result
        });
      })
      .catch(error => {
        console.log("error Occured");
      });
    this.setState({ loading: false });
  }
  async _getLanguageList(id) {
    this.setState({ loading: true });
    await GetLanguageList()
      .then(res => {
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
      title: "Select Your Language",
      headerStyle: { backgroundColor: purple },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button small style={{backgroundColor:'white',marginTop:13,marginRight:5,borderRadius: 3}} onPress={() => languageScreen._signOutAsync()}>
          <Text style={{color:purple}}>Logout</Text>
        </Button>
      )
    };
  };


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
_languageButtonPress=()=>{
  // console.log("laId",this.state.LanguageId);
  if (this.state.LanguageId==0) {
    Toast.show({
      text: "Choose A Language First",
      buttonText: "Ok",
      type: "danger",
      duration: 3000,
      position: "bottom"
    });
  } else {
    this.props.navigation.navigate("QuestionDetailsScreen",{
      RequestId:this.state.requestId,
      LanguageId:this.state.LanguageId,
      questionIndex:0
    });
  }

}
_gettingLanguageId=(valu)=>{
  forDataz=this.state.data;
  // console.log(valu);
  for (let index = 0; index < forDataz.length; index++) {
    const element = forDataz[index];
    for(var key in element){
      if(element.hasOwnProperty(key)){
        if(element[key]==valu){
          this.state.LanguageId=element.Id;
        }
      }
    }
  }
};
  render() {
    if (this.state.SurveyListdata.length>0) {
      this.state.requestId=this.state.SurveyListdata[0].Id;
      // console.log(this.state.SurveyListdata[0].Id);
      return (
        <Container>
          <View>
              {/* <View>
                 <Text style={styles.LanguageDes}>This survey is to get a feedback on company and employee satisfaction. All the employee's are requested to complete the survey within 30th january</Text>
              </View> */}
            <View style={styles.dropdownList}>
              <Dropdown  label='Language' data={this.state.data}
              onChangeText={(valu)=>{
                this._gettingLanguageId(valu);
              }}
              />
            </View>
          <Button style={styles.surveyButton} onPress={this._languageButtonPress}>
            <Text>Start Survey</Text>
          </Button>
          </View>
          {this.state.loading ? <ActivityIndicator  size="large" color="green"  /> : null}
        </Container>
      );
      
    } else {
      return(
        <Container>
            <View>
              <Text style={styles.noItem}>No Survey is Currently Available</Text>
            </View>
        </Container>
      );
    }

  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  dropdownList:{
    marginTop:40,
    width:150,
    alignSelf:'center',
  },
  LanguageDes: {
    color: 'black',
    fontWeight:'bold',
    fontSize: 16,
    textAlign:'center',
    marginTop:40,
  },
  surveyButton:{
    // backgroundColor: '#3399ff',
    backgroundColor:purple,
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
  noItem: {
    color: 'red',
    fontWeight:'bold',
    fontSize: 20,
    alignSelf:'center',
    marginTop:100,
  },
  
});
export default LanguageScreen;
