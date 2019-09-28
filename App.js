import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font, AppLoading, SplashScreen, Notifications } from "expo";
import { Root, Icon } from "native-base";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import LoginScreen from "./src/screen/Login/LoginScreen";
import ForgotPasswordScreen from "./src/screen/Login/ForgotPasswordScreen";
import SurveyListScreen from "./src/screen/Survey/SurveyListScreen";
import SurveyDetailsScreen from "./src/screen/Survey/SurveyDetailsScreen";
import LanguageScreen from './src/screen/Survey/LanguageListScreen';
import SurveyAnswerScreen from './src/screen/Survey/SurveyAnswerScreen';
import QuestionDetailsScreen from './src/screen/Survey/QuestionDetailsScreen';
import SurveyCompleteScreen from './src/screen/Survey/surveyCompleteScreen';
import AuthLoadingScreen from "./src/screen/Login/AuthLoadingScreen";
import Asset from "expo-asset/src/Asset";

const LoginStackNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    // SignupScreen: { screen: SignupScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen }
    // OtpVarityScreen: { screen: OtpVarityScreen }
  },
  {
    headerMode: "float",
    navigationOptions: {
      header: null,
      headerStyle: { backgroundColor: "#E73536" },
      title: "You are not logged in",
      headerTintColor: "white"
    }
  }
);

const DashBoardStack = createStackNavigator({
  // SurveyListScreen: SurveyListScreen,
  // SurveyDetailsScreen: SurveyDetailsScreen,
  LanguageScreen: LanguageScreen,
  SurveyAnswerScreen:SurveyAnswerScreen,
  QuestionDetailsScreen:QuestionDetailsScreen,
  SurveyCompleteScreen:SurveyCompleteScreen

}
);

const AppStackNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: { screen: LoginStackNavigator },
      App: { screen: DashBoardStack }
    },
    {
      // Default config for all screens
      // headerMode: "none",
      title: "Main",
      initialRouteName: "AuthLoading"
    }
  )
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplashReady: false,
      isAppReady: false,
      notification: {}
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
  }

  async componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = async ({ origin, data }) => {
    if (origin == "selected") {
      // let channelId = data.channelId;
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken && channelId) {
        // let channelsResult = await GetChannelDetail(channelId);
        // if (channelsResult.isSuccess) {
        //   this.navigator.dispatch(
        //     NavigationActions.navigate({
        //       routeName: "ChannelNoticeListScreen",
        //       params: {
        //         title: channelsResult.result[0].name,
        //         channel: channelsResult.result[0]
        //       }
        //     })
        //   );
        // }
      }
    }
  };

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!this.state.isAppReady) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("./assets/splash.png")}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    if (this.state.isAppReady) {
      return (
        <Root>
          <AppStackNavigator
            ref={nav => {
              this.navigator = nav;
            }}
          />
        </Root>
      );
    }

    return <View />;
  }

  _cacheSplashResourcesAsync = async () => {
    // await this.initApiServerUrl();
    const gif = require("./assets/splash.png");
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    setTimeout(() => {
      SplashScreen.hide();
      this.setState({ isAppReady: true });
    }, 2000);
  };

//   async initApiServerUrl() {
//     var response = await IsTestVersion(
//       Platform.OS,
//       Expo.Constants.manifest.version
//     );
//     if (response.isSuccess && response.result) {
//       var apiVersionInfo = response.result[0];
//       // TODO: need to check later
//       // if (apiConfig.url == urlDev) {
//       //   if (!apiVersionInfo.isTest) {
//       //     apiConfig.url = urlTest;
//       //   }
//       // } else {
//       //   if (apiVersionInfo.isTest) {
//       //     apiConfig.url = urlTest;
//       //   }
//       // }
//     }
//     console.log(`ApiServer Url: ${apiConfig.url}`);
//   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
