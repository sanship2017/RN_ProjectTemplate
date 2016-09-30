
//LIB
import React, { Component } from 'react';
import {
  View,
  NativeModules,
  NetInfo,
  DeviceEventEmitter,
  ToastAndroid,
  BackAndroid,
  AppState,
  StyleSheet,
  NativeAppEventEmitter,
  PushNotificationIOS,
  AlertIOS,
  Platform,
  Dimensions,
  InteractionManager
} from 'react-native';

import { connect } from 'react-redux'
const SideMenu = require('react-native-side-menu');
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
const RouterWithRedux = connect()(Router);

var SensorManager = NativeModules.SensorManager;
var Spinner = require('react-native-spinkit');
var StatusBarAndroid = require('react-native-android-statusbar');
// var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

var RNIntent = NativeModules.RNIntent;
var RNHotUpdate = NativeModules.RNHotUpdate;
var DeviceInfo = require('react-native-device-info');

var RNFS = require('react-native-fs');


// action
var ActionsTypes = require( '../actions/ActionsTypes');


//Component
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var Themes = require('../Themes');
var Define = require('../Define');
var Include = require('../Include');


import ButtonWrap from '../components/elements/ButtonWrap'

var {globalVariableManager} = require('../components/modules/GlobalVariableManager');
var {Popup,popupActions} = require('../components/popups/Popup');
// screens
import HomeScreen from '../components/screens/HomeScreen'
import SecondScreen from '../components/screens/SecondScreen'
var screenList=[
  HomeScreen,
  SecondScreen,
];
//popups
var DefaultPopup = require('../components/popups/DefaultPopup');
//variable
var widthScreen = Dimensions.get('window').width;
var heightScreen = Define.constants.availableHeightScreen;


var App = React.createClass({
  // renderSideMenu:function(){
  //   var self=this;
  //    return(
  //      <SideMenu rootView={self}/>
  //    )
  //  },

  // drawSideMenu:function(flag=true){
  //   var self = this;
  //   if (self.sideMenu) {
  //     self.sideMenu.openMenu(flag);
  //   }
  // },

  handleAppStateChange:function(currentAppState){
    var self = this;
    const { dispatch,state,navigator } = this.props;
    Debug.log('handleAppStateChange ' + currentAppState , Debug.level.USER_TRACKER);
    switch (currentAppState) {
      case 'active':{
        break;
      }
      case 'background':{
        break;
      }
      case 'inactive':{
        break;
      }
      default:
    }
  },

  screenList:[],
  createScreen:function(){
    var self = this;

    self.screenList= screenList.map((current)=>{
      return(
        <Scene
          key={current.nameScreen}
          title={current.nameScreen}
          component={current}

          {...current.sceneConfig}

          bodyStyle={Themes.current.screen.bodyViewWrap}
          rootView={self}
        />
      )
    })
  },

  componentWillMount : function(){
    var self = this;
    const { dispatch,state} = this.props;
    // regis
    globalVariableManager.deepLinkManager.setRootView(self);
    globalVariableManager.reduxManager.setDispatchAndState(dispatch,state);
    globalVariableManager.rootView = self;

    // events
    NetInfo.addEventListener('change',(connectionInfo)=>{
      Debug.log('Connection state change: ' + connectionInfo,Debug.level.USER_TRACKER); // NONE , WIFI, MOBILE
    })

    // update task
    DeviceEventEmitter.addListener('HotUpdateManager:checkUpdate', (ev) => {
      Debug.log2('HotUpdateManager:checkUpdate', ev,Debug.level.USER_TRACKER);
    });
    DeviceEventEmitter.addListener('HotUpdateManager:checkUpdateDone', (arg) => {
      Debug.log2('HotUpdateManager:checkUpdateDone', arg,Debug.level.USER_TRACKER);
      // if (!self.processUpdateInfoDone ) {
      //     self.processUpdateInfo(arg);
      // }
    });
    DeviceEventEmitter.addListener('HotUpdateManager:download', (ev) => {
      Debug.log2('HotUpdateManager:download', ev,Debug.level.USER_TRACKER);
    });
    DeviceEventEmitter.addListener('HotUpdateManager:downloading', (ev) => {
      Debug.log2('HotUpdateManager:downloading ', ev,Debug.level.USER_TRACKER);
    });
    DeviceEventEmitter.addListener('HotUpdateManager:downloadDone', (ev) => {
      Debug.log2('HotUpdateManager:downloadDone', ev,Debug.level.USER_TRACKER);
    });
    DeviceEventEmitter.addListener('HotUpdateManager:updateDone', (ev) => {
      Debug.log2('HotUpdateManager:updateDone', ev,Debug.level.USER_TRACKER);
    });
    //key
    BackAndroid.addEventListener('hardwareBackPress',
       () => {
         if (popupActions.popPopup()) {
           return true;
         }
         else if(popupActions.getPopupStackSize(0)>0){
           popupActions.popPopup(0,true,0);
           return true;
         }
        //  else if (self.sideMenu && self.sideMenu.isOpen) {
        //    self.drawSideMenu(false);
        //    return true;
        //  }
        //  else if (!self.splashScreen ) {
        //    // must update
        //    var {navigator } = self.props;
        //     if(Actions.pop()) {
        //       if (navigator.current === 'HomeScreen') {
        //         RNIntent.moveTaskToBack();
        //         return true;
        //         // return false;
        //       }
        //        return true;
        //      }
        //   }
          RNIntent.moveTaskToBack();
          return true;
          // return false;
        }
      );

      DeviceEventEmitter.addListener('hardwareMenuPress', ()=>{
        // self.drawSideMenu();
      });
      AppState.addEventListener('change', self.handleAppStateChange);

      self.createScreen();
  },
  render:function(){
    var self= this;
    const { dispatch,state,appState} = this.props;
    var content;
    if (appState.currentState === ActionsTypes.APP_STATE_LIST.LOADING) {
      content=<View/>
    }else{
      content = (
        <RouterWithRedux
            sceneStyle={Themes.current.screen.appBackground}
            navigationBarStyle={Themes.Current.screen.NavBar} >
          <Scene key="root">
            {self.screenList}
          </Scene>
        </RouterWithRedux>
      )
    }

    return(
      <View style={{flex:1}}>
        {content}
        <Popup rootView={self}/>
      </View>
    )
  },

  componentDidMount : function(){
     var self = this;
     var {dispatch} = self.props;
     if (Platform.OS ==='android') {
      StatusBarAndroid.setHexColor(Themes.current.factor.backgroundColor);
     }
    //  // util connected
    //  if (globalVariableManager.socketConnection.getConnectState()) {
    //    dispatch(AppStateActions.setOnRequest(ActionsTypes.APP_STATE_LIST.RUNNING));
    //    self.preProcessWhenStart();
    //  }
    //  else{
    //    globalVariableManager.socketConnection.on('connect', function(){
    //      dispatch(AppStateActions.setOnRequest(ActionsTypes.APP_STATE_LIST.RUNNING));
    //        self.preProcessWhenStart();
    //      });
    //  }

  },
})


function selectActions(state) {
  return {
    appState:state.AppState,
    navigator:state.Navigator,
    serverConnection:state.ServerConnection,
  }
}

module.exports = connect(selectActions)(App);
