
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View,
  InteractionManager
} from 'react-native';


// import { connect } from 'react-redux';
var Spinner = require('react-native-spinkit');
var {Actions} = require( 'react-native-router-flux');
//action

//components
// var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
// var Util = require('../../Util/Util');
var Include = require('../../Include');


import ReactComponent from '../ReactComponent'

// var {popupActions} = require('../popups/PopupManager');
// var {globalVariableManager}= require('../modules/GlobalVariableManager');


class Screen extends ReactComponent{
  static componentName = 'UnNamedScreen'
  // static defaultProps = {}
  // static propTypes = {}
  state={}
  static sceneConfig={
    hideNavBar:false,
  }
  static renderTitle(scene){
    return(
      <View style={Themes.current.screen.titleWrapNavBarCenter}>
        <Include.Text style={Themes.current.text.navBartitle}>{scene.name}</Include.Text>
      </View>
    )
  }
  constructor(props:Object){
    super(props);
    this.state={
      loading:true,
    }
    this.onRefresh = this.onRefresh.bind(this);
    this.onGetMore = this.onGetMore.bind(this);
  }
  onRefresh(){
    Debug.log(this.constructor.componentName + ':onRefresh',Debug.level.USER_TRACKER);
  }
  onGetMore(){
    Debug.log(this.constructor.componentName + ':onGetMore',Debug.level.USER_TRACKER);
  }
  shouldComponentUpdate(nextProps:Object){
    let ret = true;

    if (Actions.currentScene !== this.constructor.componentName) {
      ret=false;
    }
    Debug.log(this.constructor.componentName + ':shouldComponentUpdate:'+ret);

    return ret;
  }
  // over write by children
  renderScreenContent(){}
  renderContent(){
    var content = null;
    if (this.state.loading) {
      content=(
        <View
            pointerEvents={'auto'}
            style={[Themes.current.screen.bodyView,this.props.bodyStyle,{justifyContent: 'center', alignItems: 'center'}]}>
          <Spinner type={'Wave'} color={Themes.current.factor.spinnerColor} />
        </View>
      ) ;
    }
    else{
      if (_.isFunction(this.renderScreenContent) ) {
        content = this.renderScreenContent();
      }else{
        Debug.log(this.constructor.componentName+':no renderScreenContent',Debug.level.ERROR)
        content = null;
      }
    }
    return(content)
  }
  componentDidMount(noRefresh = false){
    super.componentDidMount();
    InteractionManager.runAfterInteractions(() => {
      this.setState({loading:false});
      if (!noRefresh) {
        this.onRefresh();
      }
    });
  }
}


export default Screen
