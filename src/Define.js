/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-06T15:52:38+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Trần Quốc Phương
* @Last modified time: 2016-07-12T16:44:02+07:00
*/

var ExtraDimensions = require('react-native-extra-dimensions-android');

import {
  Dimensions, Platform,PixelRatio
} from 'react-native';

var PlatformConfig = require('./PlatformConfig');
// var RNFS = require('react-native-fs');
//variable
var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;

var screenSizeByInch = Math.sqrt(Math.pow(widthScreen,2) + Math.pow(heightScreen,2))  / (PixelRatio.get()*160) * 2;

var assets={
  Home_screen:{
    home_icon_menu : require('../assets/02_Home_screen/home_icon_menu.png'),
  }
}

var mapAssets={
}

const Define = {
  assets: (__DEV__)? assets:PlatformConfig.default.processAsset(assets,mapAssets),
  constants:{
    hybridVersion: PlatformConfig.default.hybridVersion,
    heightOfNotifyBarAndroid : ExtraDimensions.get('STATUS_BAR_HEIGHT'),
    heightOfSoftMenuBarAndroid: (Platform.OS === 'android') ? ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT'):0,
    availableHeightScreen: PlatformConfig.default.availableHeightScreen,
    widthScreen:widthScreen,
    heightScreen:heightScreen,
    screenSizeByInch:screenSizeByInch,

    imageThumbRate:(20/9),
    smallImageThumbRate:(9/6),
    videoHeight:widthScreen,
    videoWidth:heightScreen + 0,

    fontScale : Math.floor(4/PixelRatio.getFontScale()),

    navBarHeight: PlatformConfig.default.navBarHeight,
    X : (widthScreen<heightScreen? widthScreen : heightScreen)/ ((screenSizeByInch<7)?9.25:12) ,

    // serverAddr :'http://sctvserver.ddns.net', // http://123.30.235.201:9697  //
    serverAddr :'http://gate.tv247.vn:9696/',  // production // http://123.30.235.63:9696/
    // serverAddr:'http://123.30.235.201:34746',
    // serverAddr :'http://192.168.3.151:8080',
    getMsisdnAddr:'http://tv247.vn/getMsisdn',
    font:'roboto-regular',
    fontBold:'roboto-bold',
    dataBase:'database.db',
    // crashLog: RNFS.DocumentDirectoryPath + '/CrashLog.txt',
    // trackingLog: RNFS.DocumentDirectoryPath + '/TrackingLog.txt',
    alarmListTable:'AlarmList',
    footballTeamsTable:'FootballTeams',
    signoutBeforeDisconnect:true,
    accoutTest:{
      user:'',   // TODO : must = '' when release
      pass:'',
    },
    getMoreHeight:100,
    getMoreHeightMin:1,
    elevation:3,
    periodOfAccelerometer:1000,
    requestTimeout:30000,

    debug:true,  // must false in release
    debugStyle:false,
    debugTrackerLogLength:66,
    logLevel:0,  // must be 10 when release
    funnyMode:false,
  },
  config:{
    properties:{
      dtid: "0",
      spid: "0",
    },
    currentHybridVersion:0,
    ...PlatformConfig.token,
  }
}

module.exports = Define;
