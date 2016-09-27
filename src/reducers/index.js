/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-08T08:38:52+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Anonymous080
* @Last modified time: 2016-07-11T10:26:21+07:00
*/

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
    // Todo : Todo(state. , action),
  };

  Tracker(stateRet, action);
  return stateRet;
}


module.exports = todoApp;
