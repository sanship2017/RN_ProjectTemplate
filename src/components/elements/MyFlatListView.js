
import React from 'react';

var {
  View,
  FlatList,
  Image,
  InteractionManager
} = require('react-native');

var Define = require('../../Define');
var Debug = require('../../Util/Debug');
var Themes = require('../../Themes');
var Include = require('../../Include');

var ButtonWrap = require('./ButtonWrap');

// var


var MyFlatListView = React.createClass({
  propTypes: {
    /** infos is array container of info object
    *   info.title
    *             subInfo
    *             thumb
    *             data:{}
    */
    infos:React.PropTypes.array.isRequired,
    //renderDescription
    // renderTopInfo:,
    // renderAdditionAction:
    // renderPostAdditionAction:
    // style:
  },
  getDefaultProps:function(){
    return{
      containerStyle:{
        flex:1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        flexWrap: 'wrap'
      },
      contentWrapStyle:{
        flexDirection :'row',
        padding:4,
      },
      contentThumbStyle:{

      },
      descriptionWrapStyle:{

      },
    }
  },
  getInitialState :function(){
    const self = this;
    // const dataSource = new ListView.DataSource({rowHasChanged: self.props.rowHasChanged ? self.props.rowHasChanged : (r1, r2) => r1 !== r2});

    return({
      // ds: dataSource.cloneWithRows(self.props.infos?self.props.infos:[])
    })
  },

  _keyExtractor:function(item, index){
    return item.id
  },

  renderDescription:function(item:any){
    var self = this;
    if (!item.title && !item.subInfo) {
      return null;
    }

    var itemContent = null;
    if (item.subInfo) {
      itemContent = <Include.Text numberOfLines={1} >{item.subInfo}</Include.Text>;
    }
    return(
      <View style={self.props.descriptionWrapStyle}>
        <Include.Text numberOfLines={3} >{item.title}</Include.Text>
        {itemContent}
      </View>
    )
  },

  _renderItem: function({item,index}) {
    var self = this;
    var thumbElement = null;
    if (item.thumb) {
      if (self.props.renderTopInfo) {
        thumbElement=(
          <View>
            <Include.Image style={self.props.contentThumbStyle} source={item.thumb?item.thumb:undefined}/>
            {self.props.renderTopInfo(item,sectionID,rowID)}
          </View>
        )
      }else{
        thumbElement = <Include.Image style={self.props.contentThumbStyle} source={item.thumb?item.thumb:undefined}/>
      }
    }

    if(item.thumbElement){
      thumbElement = item.thumbElement
    }


    if (self.props.renderAdditionAction || self.props.renderPostAdditionAction) {
      return (
        <View key={index} style={[self.props.contentWrapStyle,item.style]}>
          {self.props.renderAdditionAction?self.props.renderAdditionAction(item):null}
          <ButtonWrap onPress={item.onPress}>
            <View style={[self.props.contentWrapStyle,{flex:1,borderBottomWidth:undefined}]}>
              {thumbElement}
              {self.props.renderDescription?self.props.renderDescription(item)  : self.renderDescription(item)}
            </View>
          </ButtonWrap>
          {self.props.renderPostAdditionAction?self.props.renderPostAdditionAction(item):null}
        </View>
      );
    }else{
      return (
        <ButtonWrap key={index} onPress={item.onPress}>
          <View style={[self.props.contentWrapStyle,item.style]}>
            {thumbElement}
            {self.props.renderDescription?self.props.renderDescription(item,self.props.descriptionWrapStyle)  : self.renderDescription(item)}
          </View>
        </ButtonWrap>
      );
    }
  },

  componentWillReceiveProps: function(nextProps:Object) {
    const self = this;
    // self.setState({
    //   ds: self.state.ds.cloneWithRows(nextProps.infos?nextProps.infos:[])
    // });
  },
  render: function(){

    var self = this;
    // var dataSource=[];

    var scrollPropsList=[
      // 'refreshControl',
      // 'scrollEventThrottle',
      // 'onScroll',
      // 'onContentSizeChange',
      // 'showsHorizontalScrollIndicator',
      // 'showsVerticalScrollIndicator',
      'horizontal',
      'onLayout',
      'contentContainerStyle',
      // 'scrollEnabled',
    ]

    var scrollProps ={
      showsHorizontalScrollIndicator:false,
      showsVerticalScrollIndicator:false,
    };
    scrollPropsList.forEach((currentValue,index)=>{
      if (self.props[currentValue] !== undefined) {
        scrollProps[currentValue] = self.props[currentValue];
      }
    })

    var listViewPropsList=[
      'initialNumToRender'
    ]

    var listViewProps={
      initialNumToRender:1,
    };
    listViewPropsList.forEach((currentValue,index)=>{
      if (self.props[currentValue] !== undefined) {
        listViewProps[currentValue] = self.props[currentValue];
      }
    })

    return(
      <FlatList
        style={[ {padding:2 },self.props.style? self.props.style :null]}
        ref={self.props.refProp}
        enableEmptySections ={true}
        {...scrollProps}
        {...listViewProps}
        numColumns={self.props.numColumns}
        data={self.props.infos}
        keyExtractor={this._keyExtractor}
        renderItem={self.props.renderItem?self.props.renderItem: self._renderItem}
        removeClippedSubviews={self.props.removeClippedSubviews !== undefined ? self.props.removeClippedSubviews :  true}
      />
    )
  },

  scrollTo: function(obj) {
    const self = this;
    InteractionManager.runAfterInteractions(() => {
      if(self._list){
        self._list.scrollTo(obj);
      }
    });
  }
})



module.exports = MyFlatListView;
