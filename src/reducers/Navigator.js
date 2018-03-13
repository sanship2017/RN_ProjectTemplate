
// var RDActionsTypes = require( '../actions/RDActionsTypes');
var {ActionConst} = require( 'react-native-router-flux');
var Debug = require('../Util/Debug');

/**
 * Reducer for Navigator.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function Navigator(state ={
      stack: [],
      currentScreen:{
        name : 'HomeScreen'
      },
      navigating:false,
      dstScreenName:'',
    } , action) {

  Debug.log('Navigator',action)
  var stateTemp =state;
  switch (action.type) {
    case ActionConst.FOCUS:{
      stateTemp = Object.assign({}, state);
      // stateTemp.navigating = false;
      stateTemp.currentScreen.name = action.routeName;

      return  stateTemp ;
    }
    case ActionConst.BLUR:{
      // stateTemp = Object.assign({}, state);
      // stateTemp.navigating = false;
      // // stateTemp.currentScreen.name = action.scene.name;
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.PUSH:{
      // stateTemp = Object.assign({}, state);
      // stateTemp.navigating = true;
      // // stateTemp.dstScreenName = action.key;
      // // stateTemp.stack.push(action.key);
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.JUMP:{
      // stateTemp = Object.assign({}, state);
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.REPLACE:{
      // stateTemp = Object.assign({}, state);
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.BACK:{
      // stateTemp = Object.assign({}, state);
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.BACK_ACTION:{
      // stateTemp = Object.assign({}, state);
      // stateTemp.stack.pop();
      // Debug.log2('Data:', action);
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.POP_TO:{
      // stateTemp = Object.assign({}, state);
      //
      // return  stateTemp ;
      return  state ;
    }
    case ActionConst.REFRESH:{
      // stateTemp = Object.assign({}, state);
      //
      // return  stateTemp ;
      return  state ;
    }


    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      return stateTemp
  }
}


module.exports= Navigator;
