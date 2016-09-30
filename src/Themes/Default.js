
var Define = require('../Define'); // var Include = require('../Include');
var StyleConfig = require('./StyleConfig');
import {Platform,PixelRatio} from 'react-native';

var X = Define.constants.X;

var Default ={
  init:function(){
    return (
      {
  screen:{
    appBackground:{
      flex:1,
      // backgroundColor:'#1b1b1b',
      // ...StyleConfig.shadownStyle,
    },
    NavBar:{
      height:Define.constants.navBarHeight,
    },
    leftButtonWrapNavBar:{
      position:'absolute', height:Define.constants.navBarHeight,width:Define.constants.widthScreen/2,flexDirection:'row',alignItems:'center',
    },
    leftButtonIcon:{
      marginLeft:10,width:10,height:20,tintColor :'#FFF',
    },
    rightButtonWrapNavBar:{
      position:'absolute',height:Define.constants.navBarHeight,width:Define.constants.widthScreen/2,right:0,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',
    },
    titleWrapNavBarCenter:{
      top:0,bottom:0,left:0,right:0,position:'absolute',alignSelf:'center',alignItems :'center' ,justifyContent:'center',
    },
    titleWrapNavBarLeft:{
      top:0,bottom:0,left:0,right:0,position:'absolute',alignSelf:'center',alignItems :'flex-start',justifyContent:'center',
    },
    bodyViewWrap:{justifyContent: 'flex-start',top: Define.constants.navBarHeight,bottom:0,right:0,left:0,
      position: 'absolute',
      backgroundColor: '#e0e0e0',
      elevation:Define.constants.elevation,
      borderColor:'#000',
    },
    bodyView:{
      top: 50,bottom:0,right:0,left:0,position: 'absolute'
    },
  },
  tabbar:{
    tabBlank:{
      flex: 1,alignItems: 'center',justifyContent: 'space-around'
    },
    // tabSelected: {
    //   flex: 1,alignItems: 'center',justifyContent: 'space-around',backgroundColor: '#58A153',
    // },
    // tabSelected2: {
    //   flex: 1,alignItems: 'center',justifyContent: 'space-around',backgroundColor: '#bc7905',
    // },
    tabsWrap: {
      backgroundColor: '#FFFFFF',elevation:Define.constants.elevation,borderColor:'#000',
    },
    tabs: {
      height: 40,flexDirection: 'row',justifyContent: 'space-around',top: 0,
    },
    icon: {
      width: 22,
      height: 15,
      position: 'relative',
      alignSelf  :'center'
    },
    container: {
      flex: 1,
      marginTop: 0,
    },
    tabView: {
      flex: 1,
      padding: 0,
    },
  },
  page:{

  },
  popup:{

  },
  text:{
    defaultText:{
      color:'#303030'
    },
    navBartitle:{
      fontSize:17,fontFamily:Define.constants.fontBold,color:'#000'
    },
    tabbarTitle:{
      fontSize:12,fontFamily: Define.constants.fontBold,
    },
    tabbarTitle2:{
      fontSize:13,fontFamily: Define.constants.fontBold,
    },
    title:{
      fontSize:17,fontFamily:Define.constants.fontBold
    },
    subTitle:{
      fontSize:15,fontFamily:Define.constants.fontBold
    },
    normal:{
      fontSize:13,
    },
    subNormal:{
      color:'#8b8b8b',fontSize:10,
    },
  },
  image:{

  },
  factor:{
    openSideMenuOffset:X*7.36,
    refreshingColor:['#ed1c24', '#0095da', '#fff200' , '#4279bd'],
    refreshingBackgroudColor:'#FFFFFF',
    placeholderSearchTextColor:'#939393',
    spinnerColor:'#1e8668',
    backgroundColor:'#1b1b1b'
  },
}
    )
  }
}

module.exports = Default;
