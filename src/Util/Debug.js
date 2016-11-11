
// var React = require('react-native');
// var {
//   StyleSheet,
// } = React;

var Define = require('../Define');
var Util = require('./Util')
var styles ={
  borderColor:'#000',
  // borderColor:'#FFF',
  borderWidth:1,
  borderRadius:4,
  // margin :1,
}
var trackerLog = [];

var Debug={
  level:{
    VERBOSE:0,
    DATA:1,
    PROCESS:2,
    MARK:9, // mark for higher level
    DATA_USER_TRACKER:10,
    USER_TRACKER:11,
    DATA_ERROR:12,
    WARNING:13,
    ERROR:14,
  },
  styles:styles,
  trackerLog:trackerLog,
  log:(text,level=2)=> {
    if (Define.constants.debug && (level >= Define.constants.logLevel)) {
      console.log(text);
    }
    else if (level >= Define.constants.logLevel){
      trackerLog.push(Util.date2String(new Date(),'mm/dd - HH:MM:SS') + ' : ' + /*((typeof(text)==='object')? JSON.stringify(text):*/text /*)*/);
      if (trackerLog.length > Define.constants.debugTrackerLogLength) {
        trackerLog.shift();
      }
    }
  },
  log2:(arg1,arg2,level=2)=> {
    if (Define.constants.debug && (level >= Define.constants.logLevel)) {
      console.log(arg1,arg2);
    }
    else if (level >= Define.constants.logLevel){
      trackerLog.push(Util.date2String(new Date(),'mm/dd - HH:MM:SS') + ' : ' + /*((typeof(text)==='object')? JSON.stringify(text):*/arg1 + ' ' + arg2 /*)*/);
      if (trackerLog.length > Define.constants.debugTrackerLogLength) {
        trackerLog.shift();
      }
    }
  },
}

module.exports = Debug;
