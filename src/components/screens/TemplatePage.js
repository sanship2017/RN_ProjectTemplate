
import React  from 'react';
var {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  InteractionManager
}  = require('react-native');

var Spinner = require('react-native-spinkit');
var {  Actions} = require('react-native-router-flux');
import { connect } from 'react-redux';
//
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Define = require('../../Define');
var Include = require('../../Include');

var ButtonWrap = require('../elements/ButtonWrap');

//actions

//
var {popupActions} = require('../popups/Popup');
//variable
var styles = {
  wrapper: {

  },
}

var  TemplatePage = React.createClass({
  getDefaultProps:function(){
    return({
      focus:true,
    })
  },
  getInitialState :function(){
    return({
      loading:true,
    })
  },

  // onRefresh:function(){
  //   var self = this;
  //   var {dispatch,} = self.props;
  // },

  componentWillMount:function(){
    var self = this;
    var {dispatch} = self.props;
    // self.onRefresh();
  },

  render: function() {

    var self = this;
    var {dispatch,channel} = self.props;

    // var elementArray= [];
    // Object.keys(channel.channelInfos).forEach((key,index)=>{
    //   elementArray.push(key);
    // })


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
            style={{flex:1}}
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
  }
})




function selectActions(state) {
  return {
  }
}

module.exports=connect(selectActions, undefined, undefined, {withRef: true})(TemplatePage);
