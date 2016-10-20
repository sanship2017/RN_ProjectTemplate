
//LIB
import React  from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  InteractionManager
} from 'react-native';

var {Actions} = require('react-native-router-flux');
import { connect } from 'react-redux';
var Spinner = require('react-native-spinkit');
//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');

var {popupActions} = require('../popups/Popup');
var {globalVariableManager}= require('../modules/GlobalVariableManager');

var ButtonWrap = require('../elements/ButtonWrap');

//screens

// popups
var DefaultPopup = require('../popups/DefaultPopup');

// actions

//variable

// var styles = StyleSheet.create({
//
// })

//

var TemplateScreen = React.createClass({
  propTypes:{
  },
  getDefaultProps:function(){
    return({
    })
  },

  getInitialState :function(){
    return({
      loading:true,
    })
  },

  statics:{
    nameScreen:'TemplateScreen',
    sceneConfig:{
      hideNavBar:false,
    },
    renderRightButton: function(){
      return (
        <View style={Themes.current.screen.rightButtonWrapNavBar}>
          <Include.Text>RightButton</Include.Text>
        </View>
      );
    },
    // renderLeftButton: function(){
    //   return (
    //     <ButtonWrap onPress={()=>{
    //       popupActions.popAllPopup(1,true,2);
    //       popupActions.popAllPopup(0,true,1);
    //       Actions.pop();
    //     }}>
    //       <View style={[Themes.current.screen.leftButtonWrapNavBar ]}>
    //         <Include.Image style={Themes.current.screen.leftButtonIcon} source={Define.assets.cate_content.back_icon}/>
    //       </View>
    //     </ButtonWrap>
    //   );
    // },

    renderTitle:function(scene){
      // var {} = scene;
      return(
        <View style={Themes.current.screen.titleWrapNavBarCenter}>
          <Include.Text style={Themes.current.text.navBartitle}>title</Include.Text>
        </View>
      )
    }
  },

  // onRefresh:function(){
  //   var self = this;
  //   var {dispatch} = self.props;
  //   Debug.log('onRefresh',Debug.level.USER_TRACKER);
  // },
  //
  // onGetMore:function(){
  //   var self=this;
  //   var {dispatch} = self.props;
  //   Debug.log('onGetMore',Debug.level.USER_TRACKER);
  // },



  componentWillMount:function(){
    var self = this;
    var {dispatch,navigator} = self.props;
    // dispatch();
    // if () {
    //   self.onRefresh();
    // }
  },

  // shouldComponentUpdate :function(nextProps){
  //   // var self = this;
  //   // var {dispatch,navigator} = self.props;
  //   // dispatch();
  //   // if () {
  //     return true;
  //   // }
  //   // return false;
  // },
  // componentWillUpdate :function(nextProps){
  //   // var self = this;
  //   // var {dispatch,navigator} = self.props;
  //   // dispatch();
  //   // if () {
  //     return true;
  //   // }
  //   // return false;
  // },
  render:function(){
    var self= this;

    var {dispatch,navigator} = self.props;

    var content = null;
    if (self.state.loading) {
      content=(
        <View
            pointerEvents={'auto'}
            style={[Themes.current.screen.bodyView,self.bodyStyle,{justifyContent: 'center', alignItems: 'center'}]}>
          <Spinner type={'Wave'} color={Themes.current.factor.spinnerColor} />
        </View>
      ) ;
    }
    else{
      content =(
        <ScrollView
            style={[Themes.current.screen.bodyView,self.props.bodyStyle]}
            removeClippedSubviews ={true}
            refreshControl ={
              <RefreshControl
                refreshing={false? true:false}
                // onRefresh={self.onRefresh}
                colors={Themes.current.factor.refreshingColor}
                progressBackgroundColor={Themes.current.factor.refreshingBackgroudColor}/>
            }
            scrollEventThrottle={200}
            onScroll={(event)=>{
                if (event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height-event.nativeEvent.layoutMeasurement.height-Define.constants.getMoreHeight)) {
                  // self.onGetMore();
                }
              }}>
          <Include.Text>Content</Include.Text>
        </ScrollView>
      )
    }
    return(content)
  },

  componentDidMount:function(){
    var self = this;
    var {dispatch} = self.props;
    InteractionManager.runAfterInteractions(() => {
      self.setState({loading:false})
    });
  },
  // componentWillUnmount :function(){
  //
  // }
})



/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  return {
    navigator: state.Navigator,
  }
}

module.exports=connect(selectActions, undefined, undefined, {withRef: true})(TemplateScreen);
