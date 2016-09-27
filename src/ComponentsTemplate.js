
//LIB
import React  from 'react';
var {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} = require('react-native');
import { connect } from 'react-redux';

var {Actions} = require('react-native-router-flux');

//Actions
// var Actions_MiddleWare = require('../../actions/Actions_MiddleWare');
// var Actions = require('../../actions/NewsActions');

//components

var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Define = require('../../Define');
var Include = require('../../Include');

//  var {globalVariableManager}= require('./components/modules/GlobalVariableManager');

// var {popupActions} = require('../popups/Popup');
var ButtonWrap = require('../elements/ButtonWrap');
//variable

var styles={

}
//

var Template = React.createClass({
  propTypes:{

  },
  getDefaultProps:function(){
    return({

    })
  },
  getInitialState:function(){
    return({

    })
  },
  render:function(){
    var self = this;
    const {dispatch} = self.props;
    return({})
  }
})



function selectActions(state) {
  return {
    // state: state,
  }
}

module.exports=connect(selectActions, undefined, undefined, {withRef: true})(Template);
