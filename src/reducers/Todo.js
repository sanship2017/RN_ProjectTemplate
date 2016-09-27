
var ActionsTypes = require( '../actions/ActionsTypes');

var _ = require('lodash')
// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

/**
 * Reducer Template.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function Todo(state ={
                actionState:{loading:0},
              } , action) {
  var stateTemp =state;
  switch (action.type) {
    case ActionsTypes.ACTION1:{
      stateTemp = Object.assign({}, state);
      break;
    }
    case ActionsTypes.ACTION2:{
      stateTemp = Object.assign({}, state);
      switch (action.subtype) {
        case ActionsTypes.REQUEST_SUBTYPE.REQUEST:{
          stateTemp.actionState.loading++;
          break;
        }
        case ActionsTypes.REQUEST_SUBTYPE.SUCCESS:{
          if (stateTemp.actionState.loading>0) {stateTemp.actionState.loading--;}
          break;
        }
        case ActionsTypes.REQUEST_SUBTYPE.ERROR:{
          if (stateTemp.actionState.loading>0) {stateTemp.actionState.loading--;}
          break;
        }
        default:
          break;
      }
      break;
    }
    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      break;
  }

  return stateTemp;

}


module.exports= Todo;
