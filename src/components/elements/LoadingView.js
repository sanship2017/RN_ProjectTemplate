
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View
} from 'react-native';

var Spinner = require('react-native-spinkit');

import { connect } from 'react-redux';

//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');

import ReactComponent from '../ReactComponent'

var {popupActions} = require('../popups/PopupManager');
var {globalVariableManager}= require('../modules/GlobalVariableManager');

class LoadingView extends ReactComponent{
  static componentName = 'LoadingView'
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props){
    super(props);
    this.state = _.merge(this.state,
    {})
  }
  renderContent(){
    const {user} = this.props
    var content = null;
    var spinner = '';
    var textInfo = ''


    //user
    if (user.login.loading>0) {
      spinner='Wave'
      textInfo='Đăng nhập'
    }



    if (spinner || textInfo) {
      content=(
        <View
            pointerEvents={'auto'}
            style={[Themes.current.screen.bodyView,this.props.bodyStyle,{justifyContent: 'center', alignItems: 'center',backgroundColor:'transparent'}]}>
          <View style={{backgroundColor:'rgba(0,0,0,0.4)' , borderRadius:5,
                            padding:5,
                            justifyContent: 'center', alignItems: 'center',
                          }}>
            {spinner?<Spinner type={spinner} color={Themes.current.factor.spinnerColor} />:null}
            <Include.Text style={{color:'#ffffff'}}>{textInfo}</Include.Text>
          </View>
        </View>
      ) ;
    }

    return(content)
  }
}

/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  return {
    user:state.User,
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(LoadingView);
// export default LoadingView
