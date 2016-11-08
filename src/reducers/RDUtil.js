
var _ = require('lodash')

var RDActionsTypes = require( '../actions/RDActionsTypes');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');

var RDUtil = {

  processReducerLoading(state,action,nameAction,process={onRequest:undefined,onSuccess:undefined,onError:undefined}){
    let stateTemp = Object.assign({}, state);
    switch (action.subtype) {
      case RDActionsTypes.REQUEST_SUBTYPE.REQUEST:{
        stateTemp[nameAction].loading++;
        if(process.onRequest) {process.onRequest()}
        break;
      }
      case RDActionsTypes.REQUEST_SUBTYPE.SUCCESS:{
        if (stateTemp[nameAction].loading>0) {stateTemp[nameAction].loading--;}
        if(process.onRequest) {process.onSuccess()}
        break;
      }
      case RDActionsTypes.REQUEST_SUBTYPE.ERROR:{
        if (stateTemp[nameAction].loading>0) {stateTemp[nameAction].loading--;}
        if(process.onRequest) {process.onError()}
        break;
      }
      default:
        break;
    }
    return stateTemp
  },
}




module.exports = RDUtil;
