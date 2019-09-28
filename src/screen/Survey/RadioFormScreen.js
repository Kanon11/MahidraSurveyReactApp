import React, { Component } from "react";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
export default class QuestionDetailsScreen extends Component {
    render(){
        return(
          <RadioForm
          radio_props={this.props.AnswerDataList}
          animation={false}
          initial={this.props.initialValue}
          onPress={(value) => {console.log(value)}}
          />
        );
      }
}