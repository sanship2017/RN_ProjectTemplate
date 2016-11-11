
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';

var {Actions} = require('react-native-router-flux');
import { connect } from 'react-redux';
//action

//components
var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Util = require('../../Util/Util');
var Include = require('../../Include');

var {popupActions} = require('../popups/PopupManager');
var {globalVariableManager}= require('../modules/GlobalVariableManager');

var ButtonWrap = require('../elements/ButtonWrap');

//screens
import Page from './Page'

// popups
var DefaultPopup = require('../popups/DefaultPopup');

// actions

//variable

// var styles = StyleSheet.create({
//
// })

//

class TemplatePage extends Page{
  static componentName = 'TemplatePage'
  // static defaultProps = {
  //   ...Page.defaultProps
  // }
  // static propTypes = {
  //   ...Page.propTypes
  // }
  constructor(props){
    super(props);
    this.state = _.merge(this.state,
    {})
  }

  onRefresh(){
    super.onRefresh();
    var {dispatch} = this.props;
  }

  onGetMore(){
    super.onGetMore();
    var {dispatch} = this.props;
  }
  renderPageContent(){
    var {dispatch} = this.props;
    var content = null;
    content =(
      <ScrollView
          style={{flex:1}}
          removeClippedSubviews ={true}
          refreshControl ={
            <RefreshControl
              refreshing={false}
              onRefresh={this.onRefresh}
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
    return content;
  }
}


/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
  return {
    navigator:state.Navigator
  }
}

export default connect(selectActions, undefined, undefined, {withRef: true})(TemplatePage);
