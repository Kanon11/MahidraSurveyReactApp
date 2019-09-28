import React, { Component } from 'react';
import { View, Text,Button  } from 'react-native';
var surveyDetailsScreen;
class SurveyDetailsScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const SurveyRequestViewModel = navigation.getParam('SurveyRequestViewModel','No valu is entered')
    this.state = {
      Id:SurveyRequestViewModel.Id,
      CreatedById:SurveyRequestViewModel.CreatedById,
      CreatedByName:SurveyRequestViewModel.CreatedByName,
      Status:SurveyRequestViewModel.Status,
      SurveyDescription:SurveyRequestViewModel.SurveyDescription,
      RequestNo:SurveyRequestViewModel.RequestNo,
      StartTimeVw:SurveyRequestViewModel.StartTimeVw,
      EndTimeVw:SurveyRequestViewModel.EndTimeVw,
    };
    surveyDetailsScreen = this;
  }

  render() {
    return (

      <View>
           <Button onPress={() => {
                  this.props.navigation.navigate("LanguageScreen",{
                    RequestId:this.state.Id
                  });}}
      title="Choose your Language"
      color="#841584"
    />
        <Text>RequestNo :{this.state.RequestNo} </Text>
        <Text> CreatedByName:{this.state.CreatedByName} </Text>
        <Text> StartTimeVw:{this.state.StartTimeVw} </Text>
        <Text>EndTimeVw :{this.state.EndTimeVw} </Text>
        <Text> Status:{this.state.Status} </Text>
        <Text> SurveyDescription:{this.state.SurveyDescription} </Text>
      </View>
    );
  }
}

export default SurveyDetailsScreen;
