import React from "react";
import {
  AsyncStorage,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Login } from "../../service/AccountService";
import { signupStyles } from "../../Common/commonStyle";
import { purpleColor } from "../../Common/commonStyle";
import {
  saveToStorage,
  storage,
  CurrentUserProfile
} from "../../Common/storage";
import { Toast, Button, Text, Icon, Item, Input } from "native-base";
import { registerForPushNotificationsAsync } from "../../service/api/RegisterForPushNotificationsAsync";
export default class LoginScreen extends React.Component {
  
  static navigationOptions={
    header:null
  }  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      // UserName:"rukaiya",
      password: "",
      emailValid: true,
      passValid: true,
      hidePass: true,
      loading: false,
    };
  }

  // componentDidMount() {
  //   this.setState({ loading: true });
  // }

  onPressSubmitButton() {
    this.onFetchLoginRecords();
  }
  onPressForgotButton() {
    this.props.navigation.navigate("ForgotPasswordScreen");
  }
  async onFetchLoginRecords() {
    this.setState({ loading: true });
    console.log("trying login..");
    try {
      let UserModel = {
        UserName: this.state.email,
        Password: this.state.password
      };


      let response= await Login(UserModel);

      console.log(response);

      if (response && response.isSuccess && response.result&&response.result.AccessToken&&response.result.UserId) 
      {
        this.setState({ loading: false });
        console.log("entering app");
        await AsyncStorage.setItem("userToken", response.result.AccessToken);
        await AsyncStorage.setItem("UserId",response.result.UserId+'');
        this.props.navigation.navigate("App");

      }
        else {
          this.setState({ loading: false });
          if (response.result.message) {
            Toast.show({
              text: response.result.message,
              buttonText: "Ok",
              type: "danger",
              duration: 3000,
              position: "bottom"
            });
          }
      }
    } catch (errors) {
      console.log(errors);
    }
  }
  validateEmail = text => {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ email: text,
      //  emailValid: reg.test(text) 
      });
  };
  validatePass = text => {
    this.setState({ password: text, 
      
      // passValid: !(text.length < 5) 
    
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={signupStyles.container}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../../../assets/slogin4.png")} />
            <Text>Welcome To</Text>
            <Text>M&M TIM Employee Survey</Text>
          </View>
          <View style={{ margin: 25 }}>
            <Item
              // success={this.state.emailValid}
              // error={!this.state.emailValid}
            >
              <Input
                style={signupStyles.textInput}
                placeholder="User Name"
                returnKeyType="next"
                value={this.state.email}
                onSubmitEditing={() => this._txtPassword._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.validateEmail(text)}
              />
              {/* <Icon
                name={
                  this.state.emailValid ? "checkmark-circle" : "close-circle"
                }
              /> */}
            </Item>

            <Item success={this.state.passValid} error={!this.state.passValid}>
              <Input
                ref={input => {
                  this._txtPassword = input;
                }}
                style={signupStyles.textInput}
                placeholder="Password"
                returnKeyType="next"
                autoCorrect={false}
                secureTextEntry={this.state.hidePass}
                value={this.state.password}
                onChangeText={text => this.validatePass(text)}
              />
              <Icon
                name={this.state.hidePass ? "eye-off" : "eye"}
                android={this.state.hidePass ? "md-eye-off" : "md-eye"}
                ios={this.state.hidePass ? "ios-eye-off" : "ios-eye"}
                style={{ color: "grey" }}
                onPress={() => {
                  this.setState({ hidePass: !this.state.hidePass });
                }}
              />
            </Item>

            <Button
              style={
                this.state.passValid
                  ? signupStyles.buttonSubmit
                  : { marginTop: 10 }
              }
              block
              disabled={!this.state.emailValid || !this.state.passValid}
              onPress={this.onPressSubmitButton.bind(this)}
            >
              <Text> Login </Text>
            </Button>

          </View>
        </KeyboardAvoidingView>
        {this.state.loading ? <ActivityIndicator  size="large" color="green"  /> : null}
      </ScrollView>
    );
  }
}
