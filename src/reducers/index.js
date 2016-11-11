
// var Todo = require('./Todo');


var Tracker = require('./Tracker');
var AppState = require('./AppState');
var Navigator = require('./Navigator');
var Store = require('./Store');


/**
 * Reducer index.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
export default function todoApp(state = {}, action) {
  var stateRet = {
    AppState : AppState(state.AppState , action),
    Navigator : Navigator(state.Navigator , action),
    Store : Store(state.Store , action),
    // Todo : Todo(state.Todo , action),
  };

  Tracker(stateRet, action);
  return stateRet;
}


module.exports = todoApp;
