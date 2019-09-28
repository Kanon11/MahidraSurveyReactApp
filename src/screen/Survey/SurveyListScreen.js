import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet, FlatList,Alert,TouchableOpacity,ActivityIndicator } from "react-native";
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
import {
  loadFromStorage,
  saveToStorage,
  storage,
  CurrentUserProfile
} from "../../Common/storage";
import { GetSurveyList } from "../../service/SurveyService";
import { purpleColor } from "../../Common/commonStyle";

import flatListData from "../../../data/flatListData";

import { getPushNotificationExpoTokenAsync } from "../../service/api/RegisterForPushNotificationsAsync";
import { RemoveDeviceToken } from "../../service/AccountService";

var surveyListScreen;
class SurveyListScreen extends Component {
  constructor(props) {
    super(props);
    // const { navigation } = this.props;
    // const SurveyList = navigation.getParam('SurveyList','No valu is entered');

    this.state = {
      id: null,
      loading: false,
      data: [],
    };
    surveyListScreen = this;
  }
  componentDidMount() {
    this._getSurveyList(this.state.id);
    // console.log(UserName);
  }
  async _getSurveyList(id) {
    this.setState({ loading: true });
     var UserName= await AsyncStorage.getItem("UserName");
      var Password=await AsyncStorage.getItem("Password");
      console.log(UserName);
      console.log(Password);

    await GetSurveyList(id,UserName,Password)
      .then(res => {
        // console.log(res.result);
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
      title: "Survey List",
      headerStyle: { backgroundColor: "#3399ff" },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // headerTintColor: purpleColor,
      headerRight: (
        <Button style={{backgroundColor:'#ff6600',marginTop:5,marginRight:5,borderRadius: 3,}} 
        onPress={() => surveyListScreen._signOutAsync()}>
          <Text>Logout</Text>
        </Button>
      )
    };
  };


  _signOutAsync = async () => {
//     var UserName= await AsyncStorage.getItem("UserName");
// var Password=await AsyncStorage.getItem("Password");
// console.log(UserName);
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    if (this.state.data.length>0) {
      return (
        <Container>
          <View style={{ flex: 1, marginTop: 22 }}>
            <FlatList
              keyExtractor={item => item.Id.toString()}
              data={this.state.data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("LanguageScreen",{
                      RequestId:item.Id
                    });}}>
                      <FlatListItem item={item} index={index}>
                      
                      </FlatListItem>
                  </TouchableOpacity>
  
                  );
              }}
            >
            </FlatList>
          </View>
          {this.state.loading ? <ActivityIndicator /> : null}
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
class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.props.index % 2 == 0 ? '#ff6600' : '#3399ff',
      }}>
          <Text style={styles.flatListItem}>{this.props.item.SurveyDescription}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    fontWeight:'bold',
    padding: 10,
    fontSize: 16,
  },
  noItem: {
  color: 'red',
  fontWeight:'bold',
  fontSize: 20,
  alignSelf:'center',
  marginTop:100,
},

});
export default SurveyListScreen;
