
//LIB
import React from 'react';
var {
  View,
  // Dimensions,
} = require('react-native');

import { connect } from 'react-redux';

//components
// var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Define = require('../../Define');
var Include = require('../../Include');

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

var FadeDownDefaultPopup = React.createClass({
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
      pointerEvents:'none',
      group:popupConst.INFO_GROUP,
      movePopupIn:(contentObject)=>{
        var contentRefObject =  contentObject.objRef;
        return contentRefObject.fadeInDown(600);
      },
      movePopupOut:(contentObject)=>{
        var contentRefObject =  contentObject.objRef;
        return contentRefObject.fadeOutUp(200);
      }
    },
    containerStyle:{
      backgroundColor:'transparent',
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'center',
      alignSelf:'stretch',
      // width: Define.constants.widthScreen,
    }
  },
  render:function(){
    var self = this;
    const {disableClose,description,buttonTitle,onPress,onPressPopup} = self.props;

    var closeButton = null;
    if (!disableClose) {
      closeButton=(
        <ButtonWrap onPress={()=>{popupActions.popPopup(undefined,undefined,popupConst.INFO_GROUP)}}>
          <View style={{flexDirection:'row',alignSelf:'flex-end',padding:2}}>
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
              style={{flex:1,margin :5,alignSelf:'center',borderRadius:4}}/>
      )
    }
    if (onPressPopup && !buttonTitle) {
      return(
        <ButtonWrap onPress={()=>{
            onPressPopup();
          }}>
          <View style={Themes.current.popup.fadeDownContainer}>
            {closeButton}
            {/*<Include.Text style={{left:0,right:0,fontSize :16,color:'#e89614',marginVertical:0,alignSelf:'center'}}>{title}</Include.Text>*/}
            <Include.Text style={Themes.current.text.fadeDownPopup}>{description}</Include.Text>
            {self.props.children}
            {button}
          </View>
        </ButtonWrap>
      )
    }
    else{
      return(
        <View style={Themes.current.popup.fadeDownContainer}>
          {closeButton}
          {/*<Include.Text style={{left:0,right:0,fontSize :20,color:'#e89614',marginVertical:0,alignSelf:'center'}}>{title}</Include.Text>*/}
          <Include.Text style={Themes.current.text.fadeDownPopup}>{description}</Include.Text>
          {self.props.children}
          {button}
        </View>
      )
    }
  },

  componentDidMount:function(){
    var self = this;
    const {time2Close} = self.props;
    setTimeout(()=>{
      popupActions.popPopup(undefined,undefined,popupConst.INFO_GROUP);
    },time2Close?time2Close:5000)
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

module.exports=connect(selectActions)(FadeDownDefaultPopup);
