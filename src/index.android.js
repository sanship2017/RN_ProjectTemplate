/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component}  from 'react';
import {
  AppRegistry,
  NativeModules,
  View,
  AsyncStorage
} from 'react-native';

import RNRestart from 'react-native-restart';

import { createStore,applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import devTools from 'remote-redux-devtools'
import { autoRehydrate, persistStore } from 'redux-persist'
import createSensitiveStorage from "redux-persist-sensitive-storage";

//

var Util = require('./Util/Util');


  var Define = require('./Define');

  // NOTE : must create global variable first of all
  var {globalVariableManager}= require('./components/modules/GlobalVariableManager');

  globalVariableManager.init();
  Util.enableDebug();
  var App = require('./containers/App');
  var reducers = require('./reducers');

    // variable

  class ProjectTemplate extends Component {
    constructor() {
      super();
      this.state = {
          loading: true,
      };
      const enhancer = compose(
        applyMiddleware(thunk),
        autoRehydrate(),
        // devTools({
        //   name: 'ProjectTemplate', realtime: true ,port:8000
        // }),
        );
      this.store = createStore(reducers, enhancer);
      // console.disableYellowBox = true;
      Define.init(()=>{
        // persistStore(this.store, {storage: AsyncStorage,whitelist:[]},
        //       ()=>{this.setState({loading:false});}
        //     )

        persistStore(this.store, { storage: createSensitiveStorage({
                keychainService: "myKeychain",
                sharedPreferencesName: "mySharedPrefs"
              }) ,whitelist:['User']},
              ()=>{this.setState({loading:false});}
        );
      })
    }

    render() {
      if(this.state.loading){
        return (<View/>)
      }else{
        return (
            <Provider store={this.store}>
              <App/>
            </Provider>
          )
      }
    }
  }



  AppRegistry.registerComponent('ProjectTemplate', () => ProjectTemplate);
