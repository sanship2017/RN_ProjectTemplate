
//LIB
import React from 'react';
var {
  View,
  // Dimensions,
} = require('react-native');

import { connect } from 'react-redux';

//components
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Define = require('../../Define');
var Include = require('../../Include');
var StyleConfig = require('../../Themes/StyleConfig');

var RectButton = require('../elements/RectButton');
var ButtonWrap= require('../elements/ButtonWrap');

var {popupActions,popupConst} = require('./Popup');

// action

//variable
//
//

// var styles={
//   container:{
//     backgroundColor:'#FFF',
//     borderWidth:1,
//     borderColor:'#000',
//     borderRadius:4,
//     flexDirection:'column',
//     alignItems:'center',
//     padding:10,
//   }
// }


//

var DefaultPopup = React.createClass({
  propTypes:{
    // disableClose:React.PropTypes.bool,
  },
  getDefaultProps:function(){
    return({

      disableClose:true,
    })
  },
  statics:{
    namePopup:'DefaultPopup',
    config:{
      tapToExit : true,videoMotion:false,group:popupConst.POPUP_GROUP
    },
    containerStyle:{
      flexDirection:'column',
      justifyContent:'center',
    }
  },
  componentWillMount:function(){
    var self = this;
    if (self.props.onWillMount) {
      self.props.onWillMount();
    }
  },
  render:function(){
    var self = this;
    const {disableClose,title,description,description2,buttonTitle,onPress,buttonTitle2,onPress2,onPressPopup} = self.props;

    var description2Text = null;
    if (description2) {
      description2Text= <Include.Text style={{left:0,right:0,color:'#000',marginVertical:5,alignSelf:'center',textAlign :'center'}}>{description2}</Include.Text>
    }

    var closeButton = null;
    if (!disableClose) {
      closeButton=(
        <ButtonWrap onPress={()=>{
              popupActions.popPopup(undefined,undefined,undefined,undefined,[popupConst.INFO_GROUP]);
            }}>
          <View style={{position: 'absolute', top: 0, bottom: 0,left:0,right:0, justifyContent: 'flex-end',padding:3}}>
            <Include.Image tintColor={'#000'} style={Themes.current.image.closeIcon} source={Define.assets.Home.close}/>
          </View>
        </ButtonWrap>
      )
    }
    var button = null;
    if (buttonTitle) {
      button=(
        <RectButton
              onPress={()=>{onPress();}} text={buttonTitle}
              contentStyle={{alignSelf:'center'}}
              textStyle={{alignSelf:'center',marginLeft:0,fontSize :14,fontWeight :'bold'}}
              style={Themes.current.component.normalGreenButton}/>
      )
    }
    var button2 = null;
    if (buttonTitle2) {
      button2=(
        <RectButton
              onPress={()=>{onPress2();}} text={buttonTitle2}
              contentStyle={{alignSelf:'center'}}
              textStyle={{alignSelf:'center',marginLeft:0,fontSize :14,fontWeight :'bold'}}
              style={Themes.current.component.normalRedButton}/>
      )
    }

    if (onPressPopup && !(buttonTitle&&buttonTitle2)) {
      return(
        <ButtonWrap onPress={()=>{
            onPressPopup();
          }}>
          <View style={{backgroundColor:'#fff',padding:5,margin:5,borderRadius:4,...StyleConfig.shadownStyle,  ...self.props.style}}>
            <View style={[Themes.current.popup.titleWrap, {paddingLeft: 20, paddingRight: 20}]}>
              <Include.Text style={Themes.current.text.popupTitle}>{title}</Include.Text>
              {closeButton}
            </View>

            <Include.Text style={{left:0,right:0,color:'#000',marginVertical:5,alignSelf:'center',textAlign :'center'}}>{description}</Include.Text>
            {description2Text}
            {self.props.children}
            <View style={{flexDirection:'row', justifyContent: 'space-between', flex: 1}}>
              {button}
              {button2}
            </View>
          </View>
        </ButtonWrap>
      )
    }
    else{
      return(
        <View style={{backgroundColor:'#fff',padding:5,margin:5,borderRadius:4,...StyleConfig.shadownStyle, ...self.props.style}}>

          <View style={[Themes.current.popup.titleWrap, {paddingLeft: 20, paddingRight: 20}]}>
            <Include.Text style={Themes.current.text.popupTitle}>{title}</Include.Text>
            {closeButton}
          </View>

          <Include.Text style={{left:0,right:0,color:'#000',marginVertical:5,alignSelf:'center',textAlign :'center'}}>{description}</Include.Text>

          {description2Text}
          {self.props.children}
          <View style={{flexDirection:'row', justifyContent: 'space-around', flex: 1}}>
            {button}
            {button2}
          </View>
        </View>
      )
    }
  },
  componentWillUnmount:function(){
    var self = this;
    if (self.props.onWillUnmount) {
      self.props.onWillUnmount();
    }
  }
})

/**
 * function to select state.
 * @param {Object} state .
 * @returns {null} .
 */
function selectActions(state) {
  return {
  }
}

module.exports=connect(selectActions)(DefaultPopup);
