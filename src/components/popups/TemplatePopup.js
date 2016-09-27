//LIB
import React from 'react';
var {
  View,
  // Dimensions,
} = require('react-native');

import { connect } from 'react-redux';

//components
// var Debug = require('../../Util/Debug');
// var Themes = require('../../Themes');
var Define = require('../../Define');
var Include = require('../../Include');

var RectButton = require('../elements/RectButton');
var ButtonWrap= require('../elements/ButtonWrap');

var {popupActions} = require('./Popup');

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

var TemplatePopup = React.createClass({
  propTypes:{
  },
  getDefaultProps:function(){
    return({
    })
  },
  statics:{
    namePopup:'TemplatePopup',
    config:{
      // group:,
      // priority:,
      //
      // movePopupIn:, // function
      // movePopupOut:, // function
      // animationType:'flash',
      //
      // noDetectGes:false,
      // tapToExit : true,
      // videoMotion: false,
    },
    containerStyle:{
    }
  },
  render:function(){
    var self = this;
    var {dispatch} = self.props;

    return({})
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

module.exports=connect(selectActions, undefined, undefined, {withRef: true})(TemplatePopup);
