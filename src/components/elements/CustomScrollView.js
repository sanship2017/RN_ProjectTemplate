
var _ = require('lodash')
//LIB
import React  from 'react';
import {
  ScrollView,
  RefreshControl,
} from 'react-native';

// import { connect } from 'react-redux';

//action

//components
var Define = require('../../Define');
// var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
// var Util = require('../../Util/Util');
// var Include = require('../../Include');

import ReactComponent from '../ReactComponent'

// var {popupActions} = require('../popups/PopupManager');
// var {globalVariableManager}= require('../modules/GlobalVariableManager');

class CustomScrollView extends ReactComponent{
  static componentName = 'CustomScrollView'
  // static defaultProps = {}
  // static propTypes = {}
  constructor(props){
    super(props);
    this.state = _.merge(this.state,
    {})
  }
  renderContent(){
    var content = null;
    content =(
      <ScrollView
          style={{flex:1}}
          removeClippedSubviews ={true}
          refreshControl ={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.props.onRefresh}
              colors={Themes.current.factor.refreshingColor}
              progressBackgroundColor={Themes.current.factor.refreshingBackgroudColor}/>
          }
          scrollEventThrottle={200}
          onScroll={(event)=>{
              if (event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height-event.nativeEvent.layoutMeasurement.height-Define.constants.getMoreHeight)) {
                if (this.props.onGetMore) {
                  this.props.onGetMore();
                }
              }
            }}
          {...this.props}
            >
        {this.props.children}
      </ScrollView>
    )
    return(content)
  }
}

/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
// function selectActions(state) {
//   return {}
// }

// export default connect(selectActions, undefined, undefined, {withRef: true})(CustomScrollView);
export default CustomScrollView
