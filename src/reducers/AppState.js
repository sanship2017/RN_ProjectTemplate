import {
  Dimensions
} from 'react-native';

var ActionsTypes = require( '../actions/ActionsTypes');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
// NOTE : if want to use promise of middleware action , this reducer must update state to a temp to use in then of promise
// =>no no no , only need update state variable from reduxManager in then funciton   (maybe because pointer changed)

var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;

/**
 * Reducer Template.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function AppState(state ={
  currentState:ActionsTypes.APP_STATE_LIST.LOADING,
  currentDirect: (widthScreen < heightScreen)?ActionsTypes.APP_STATE_DIRECT_LIST.PORTRAIT:ActionsTypes.APP_STATE_DIRECT_LIST.LANDSCAPE,
                  } , action) {
  var stateTemp =state;
  switch (action.type) {
    case ActionsTypes.APP_STATE_SET:{
      stateTemp = Object.assign({}, state);
      switch (action.subtype) {
        case ActionsTypes.REQUEST_SUBTYPE.REQUEST:{
          stateTemp.currentState = action.data;
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


module.exports= AppState;
