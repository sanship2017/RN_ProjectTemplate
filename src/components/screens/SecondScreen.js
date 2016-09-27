/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-06T15:49:32+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Trần Quốc Phương
* @Last modified time: 2016-07-12T15:34:42+07:00
*/

import React from 'react';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} = require('react-native');

var Spinner = require('react-native-spinkit');
import * as Animatable from 'react-native-animatable';
//Component
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Include = require('../../Include');
var Define = require('../../Define');

var { Actions} = require('react-native-router-flux');

//  var SCTVScrollableTabBarContainer = require('./SCTVScrollableTabBarContainer');
//
// var SCTVNotifyButton = require('../elements/SCTVNotifyButton');
var ButtonWrap = require('../elements/ButtonWrap');
var {popupActions} = require('../popups/Popup');
// Actions
// var NewsActions_MiddleWare = require('../../actions/NewsActions_MiddleWare');
// var UserActions_MiddleWare = require('../../actions/UserActions_MiddleWare');

//
var DefaultPopup = require('../popups/DefaultPopup');
//
var  SecondScreen = React.createClass({
  propTypes: {
    style:React.PropTypes.any,
  },

  getDefaultProps: function() {
    return {
    };
  },
  getInitialState:function(){
    return({
      fontSize:10
    })
  },
  statics:{
    nameScreen:'SecondScreen',
    sceneConfig:{
      hideNavBar:false,
    },
    // renderRightButton: function(scene){
    //   return (
    //     <View style={{width:10,height:10,backgroundColor:'#000'}}/>
    //     // <SCTVNotifyButton/>
    //   );
    // },

    renderLeftButton: function(scene){
      return (
        <ButtonWrap onPress={()=>{scene.rootView.drawSideMenu();}}>
          <View style={Themes.Current.screen.leftButtonWrapNavBar}>
            <Include.CustomImage style={{width:20,height:20 }} source={Define.assets.Home_screen.home_icon_menu}/>
          </View>
        </ButtonWrap>
      );
    },

    renderTitle:function(scene){
      return(
        <View style={Themes.Current.screen.titleWrapNavBarCenter}>
          <Text>abc</Text>
        </View>
      )
    }
  },

  componentWillMount:function(){
    var self = this;
    var {dispatch,} = self.props;
    // dispatch(UserActions_MiddleWare.getVipList());
    //
    popupActions.setRenderContentAndShow(
      DefaultPopup,
      {
        title:'.................................',
        onPressPopup:()=>{popupActions.setVideoPopupState('FULLSCREEN')}
      })
  },

  render:function(){
    var self = this;
    // <SCTVNavigatorTabBar/>
    return(
      <View style={[Themes.Current.screen.bodyView,self.bodyStyle]}>
        <ButtonWrap onPress={()=>{
          Actions.pop();
        }}>
          <Spinner type={'Bounce'} color={'black'} style={{height: 50,width:50}} />
        </ButtonWrap>

        <ButtonWrap onPress={() => this.refs.view.flipInX().then((endState) => {console.log(endState.finished ? 'bounce finished' : 'bounce cancelled');})}>
          <Animatable.View ref="view">
            <Text>Bounce me!</Text>
          </Animatable.View>
        </ButtonWrap>
      </View>
    )
  }
});

var styles = StyleSheet.create({

})


module.exports = (SecondScreen);
