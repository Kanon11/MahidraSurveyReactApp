import { StyleSheet } from "react-native";

export const purpleColor = "#865681";
export const semiGrayColor = "#e6e6ff";
export const darkGrayColor = "#999999";
export const modalGrayColor = "#d9d9d9";
export const purple="#800040";
export const skyColor="#3399ff";

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white"
  },
  textInput: {
    height: 40,
    backgroundColor: "white",
    marginBottom: 10,
    fontStyle: "italic"
  },
  buttonSubmit: {
    height: 50,
    backgroundColor: '#800040',
    marginBottom: 10,
    marginTop: 10
  },
  buttonSubmitRight: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: purpleColor
  },
  footerText: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center"
  },
  footerTextSpace: {
    marginLeft: 5,
    color: purpleColor
  }
});
export const commonStyle = StyleSheet.create({
  AboutScreen: {
    marginTop: 20,
    color: darkGrayColor,
    textAlign: "center"
  },
  ContainerColumn: {
    flex: 1,
    flexDirection: "column"
  },
  ContainerColumnWhite: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  ContainerRow: {
    flex: 1,
    flexDirection: "row"
  },
  ButtonCommon: {
    backgroundColor: purpleColor,
    marginTop: 25
  },
  buttonMid: {
    width: 80,
    height: 25,
    alignItems: "center",
    backgroundColor: purpleColor
  },
  buttonMidText: {
    color: "white",
    fontWeight: "bold"
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  labelInput: {
    color: darkGrayColor
  },
  noticeRenderer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20
  },
  noticeList: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkGrayColor
  },
  centerImage:{
    width: 50, 
    height: 50,
    borderRadius:50,
    marginTop:10,
    alignSelf:"center"
  }
});

export const IconSet = {
  Menu: {
    name: "menu",
    android: "md-menu",
    ios: "ios-menu"
  },
  SecondMenu: {
    name: "dots-vertical",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  NoticeStack: {
    name: "home",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  ChannelStack: {
    name: "view-list",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  InstituteStack: {
    name: "view-grid",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  DiscoverStack: {
    name: "search-web",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  AboutStack: {
    name: "home",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  SettingsStackNavigator: {
    name: "key-variant",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  LogoutScreen: {
    name: "log-out",
    android: "md-log-out",
    ios: "ios-log-out",
    type: "Ionicons"
  },
  Like: {
    name: "thumb-up",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Share: {
    name: "share-variant",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Bookmark: {
    name: "bookmark",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Delete: {
    name: "delete",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Report: {
    name: "file-chart",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Edit: {
    name: "pencil",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Subscribe: {
    name: "plus-box",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Unsubscribe: {
    name: "plus-box-outline",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  SendInvitation: {
    name: "email",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Cancel: {
    name: "close-outline",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  SendNotice: {
    name: "send",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  AddImage: {
    name: "plus",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  Admin: {
    name: "account",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  NewNotice: {
    name: "bell-outline",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  UniqueChannel: {
    name: "account-multiple",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  YesVote: {
    name: "emoticon-happy",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
  NoVote: {
    name: "emoticon-sad",
    android: "",
    ios: "",
    type: "MaterialCommunityIcons"
  },
};
