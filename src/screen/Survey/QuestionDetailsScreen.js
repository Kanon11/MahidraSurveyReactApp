import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet, FlatList,Alert,TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Button,
  FooterTab,
  Left,
  Icon,
  Toast,
  Right,
  Body,
  Text,
  Radio,ListItem
} from "native-base";
import { GetSurveyList,GetLanguageList,GetSurveyQuestionList,GetSurveyAnswer,SaveSurveyQuestionResponse } from "../../service/SurveyService";
import { purpleColor, purple } from "../../Common/commonStyle";

import flatListData from "../../../data/flatListData";

import { getPushNotificationExpoTokenAsync } from "../../service/api/RegisterForPushNotificationsAsync";
import { RemoveDeviceToken } from "../../service/AccountService";

var questionScreen;
class QuestionDetailsScreen extends Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const RequestId = navigation.getParam('RequestId','No valu is entered');
    const LanguageId = navigation.getParam('LanguageId','No valu is entered');
    var questionIndex=navigation.getParam("questionIndex","now value entered");

    this.state = {
    languageId:LanguageId,
    requestId:RequestId,
      id: null,
      loading: false,
      QuestionDataList: [],
      AnswerDataList:[],
      Listlength:0,
      questionId:0,
      questionDescription:null,
      givenAnswerId:-1,
      QuestionIndex:questionIndex,
      radioFromvalue:0,
      SerialNo:0,
      radio:-1,
      postArray:[],
      Answers:[],
    };
  }

  componentDidMount() {
    this._getQuestionList(this.state.requestId,this.state.languageId);
    this._getAnswerList(this.state.languageId);
  } 
  async _getQuestionList(RequestId,LanguageId) {
    this.setState({ loading: true });
    await GetSurveyQuestionList(RequestId,LanguageId)
      .then(res => {
        this.setState({
          QuestionDataList: res.result,
          Listlength:res.result.length
        });
        let i=0;
        this.state.QuestionDataList.forEach(element => {
            this.state.postArray.push({Id:i++,
                QuestionId:element.Id,
                QuestionName:element.Descriptions,
                StartTime:element.StartTime,
                SerialNo:element.SerialNo,
                givenAnswerId:-1})
        });
      })
      .catch(error => {
        console.log("error Occured");
      });
    this.setState({ loading: false });
  }
  async _getAnswerList(languageId) {
    this.setState({ loading: true });
    await GetSurveyAnswer(languageId)
      .then(res => {
        this.setState({
          AnswerDataList: res.result
        });
      })
      .catch(error => {
        console.log("error Occured");
      });
    this.setState({ loading: false });
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Question",
      headerLeft: null,
      headerStyle: { backgroundColor: purple },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    //   headerRight: (
    //     <Button style={{backgroundColor:'#ff99cc'}} onPress={() => questionScreen._signOutAsync()}>
    //       <Text>Logout</Text>
    //     </Button>
    //   )
    };
  };


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  NextResponse=()=>{
    if (this.state.radio<0) {
      Toast.show({
        text: "Choose A Option First",
        buttonText: "Ok",
        type: "danger",
        duration: 3000,
        position: "bottom"
      });
      
    } else {

              index = this.state.postArray.findIndex(x => x.QuestionName==this.state.questionDescription);
              this.state.postArray[index].givenAnswerId=this.state.radio;
              
                if (this.state.Listlength>(this.state.QuestionIndex+1)) 
                {
                  this.setState({QuestionIndex: this.state.QuestionIndex + 1});
                  this.state.radio=this.state.postArray[this.state.QuestionIndex+1].givenAnswerId;
                }
                else{
                  this.props.navigation.navigate("SurveyCompleteScreen",{
                    RequestId:this.state.requestId,
                    LanguageId:this.state.languageId,
                    postArray:this.state.postArray
                  });
                  // Alert.alert(
                  //     'Question List is Finished',
                  //     'Would you like to Finish Survey ?',
                  //     [
                  //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  //       {text: 'Yes', onPress: this.onButtonPress2},
                  //     ],
                  //     { cancelable: false }
                  //   )
                }
    }
  }
  PreviousResponse=()=>{


    index = this.state.postArray.findIndex(x => x.QuestionName==this.state.questionDescription);
    this.state.postArray[index].givenAnswerId=this.state.radio;

    if (index-1>=0) {
      this.setState({radio:this.state.postArray[index-1].givenAnswerId});
    }



    if ((this.state.QuestionIndex-1)>=0) 
    {
      this.setState({QuestionIndex: this.state.QuestionIndex - 1});
      this.state.radio=this.state.postArray[this.state.QuestionIndex-1].givenAnswerId;
      
    }
    else{
        Alert.alert(
            '',
            'Would you like to Start Survey Again?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!'),style:'cancel'},
              {text: 'Yes', onPress: this.onButtonPress1,style:'default'},
            ],
            { cancelable: false }
          )
    }
  }
  
onButtonPress1 = () =>{
    this.props.navigation.navigate("LanguageScreen",{
      RequestId:this.state.requestId
    });}

onButtonPress2 = () =>{
        this.props.navigation.navigate("SurveyCompleteScreen",{
          RequestId:this.state.requestId,
          LanguageId:this.state.languageId,
          postArray:this.state.postArray
        });}
  _getGivenAnswerId=(valu)=>{
    this.state.givenAnswerId=valu;
    // console.log(this.state.givenAnswerId);
  };
  setCurrentSelected(model){
    this.setState({radio:model.Id});
  }
  render() {
    var x;

    if (this.state.QuestionDataList.length > 0) {
         this.state.questionDescription=this.state.QuestionDataList[this.state.QuestionIndex].Descriptions;
         this.state.SerialNo=this.state.QuestionDataList[this.state.QuestionIndex].SerialNo;
    }
    return (
      <Container>
        <View style={{ flex: 1, marginTop: 22 ,marginLeft:20}}>
        <Text>Q{this.state.SerialNo}. {this.state.questionDescription}</Text>
        <Text></Text>
        <Text></Text>
        {/* <Text>{this.state.radio}</Text> */}
            {this.state.AnswerDataList.map((item, index) => (
              <TouchableOpacity style={{flex:1,flexDirection:"row"}} key={index} onPress={()=>{this.setCurrentSelected(item)}}>
                  <Radio style={{flex:.1}} color={"green"} selectedColor={purple} onPress={()=>{this.setCurrentSelected(item)}} selected={this.state.radio==item.Id?true:false}/>
                  <Text style={{marginRight:10,alignItems:"flex-start",flex:.9}} >{item.label}</Text>

              </TouchableOpacity>
            ))
            }
        </View> 
        <View style={styles.containerforButton}>
        <Button iconLeft 
        style={styles.button1} onPress={this.PreviousResponse}>
         <Icon name='arrow-back' />
          <Text>Previous</Text>
        </Button>
        <Button iconRight 
        style={styles.button2} onPress={this.NextResponse}>
          <Text>Next</Text>
          <Icon name='arrow-forward' />
        </Button>
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
  containerforButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:100,
  },
  button2: {
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
  },
  alertButtoncancle:{
    backgroundColor:'red',
  }
});

export default QuestionDetailsScreen;
