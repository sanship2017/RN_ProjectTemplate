// @flow
// var _ = require('lodash')
var RDActionsTypes = require('./RDActionsTypes');
var util = require('util')
// LIB
var TimeoutCallback = require('timeout-callback');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');

var {socketConnection} = require('../components/modules/ConnectionsManager');
var RDActions = require('./RDActions');

// NOTE : stuck when call getState (when dispatch another action in a action)

/*
 * action creators
 */

class RDActions_MiddleWare {
  name:string=''
  sortName:string=''
  logRes:boolean=true
  actionsList:Object={}
  constructor(name : string ,logRes :boolean){
    this.name = name;
    this.sortName = name.slice(0,name.indexOf('Actions'));
    this.logRes = logRes;
  }

  init(){
    var self = this;
    Object.keys(self.actionsList).forEach((key)=>{
      var obj = self.actionsList[key];
      // CREATE MIDDLEWARE FUNCTION
      self[key] = function(arg={},setState = true) {
        var actionName = key;
        var query = obj.query;
        var argTemp = Util.dataProtectAndMap(arg, obj.argFormat);

        var preTextLog = self.name+':'+actionName+':';
        return (dispatch, getState) => {
          //
          var retFromPreProcess;
          if (obj.preProcess) {
            retFromPreProcess = obj.preProcess(argTemp,getState);
          }
          if (retFromPreProcess) {
            return retFromPreProcess;
          }
          var req = {};
          // req config
          if (obj.onArg) {
            req = obj.onArg(argTemp,getState);
          }else{
            req=argTemp;
          }

          //
          Debug.log(preTextLog+':'+query+':'+JSON.stringify(req));
          var promise = new Promise((resolve,reject)=>{
            var data ={};
            // check limitProcess
            if ( getState()[this.sortName] && getState()[this.sortName][actionName]  &&
              getState()[this.sortName][actionName].loading >= obj.limitProcess) {
              Debug.log(preTextLog+':reach limitProcess:' + getState()[this.sortName][actionName].loading);
              data={
                arg:argTemp,
                err:'react limitProcess',
              }
              reject(data)
              return;
            }

            // check connection
            if (socketConnection.getConnectState()) {
              if(setState) {dispatch(RDActions[this.sortName][actionName+'OnRequest']()); }
              socketConnection.emit(query,req,
                  TimeoutCallback(Define.constants.requestTimeout,(err,res) => {
                    Debug.log(preTextLog+':callback:'+query+':'+JSON.stringify(req));
                    if (err){
                      Debug.log(preTextLog +'err:',Debug.level.ERROR);
                      // Debug.log(err);
                      if (err == 'Error: callback timeout') {
                        Debug.log(preTextLog+'callback timeout',Debug.level.ERROR);
                      }
                      data={
                        arg:argTemp,
                        err:util.inspect(err),
                      }
                      var onErrorRet = true;
                      if (obj.onError) {onErrorRet = obj.onError(dispatch,getState,data);}
                      if (onErrorRet) {
                        if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}
                        reject(data);
                      }else{
                        if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
                        resolve(data);
                      }
                    }
                    else{
                      Debug.log(preTextLog +'res:');
                      if (self.logRes) {Debug.log(res);}
                      data={
                        arg:argTemp,
                        res:res,
                      }
                      var onDoneRet = true;
                      if (obj.onDone) {onDoneRet = obj.onDone(dispatch,getState,data);}
                      if (onDoneRet) {
                        if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
                        resolve(data);
                      }else{
                        if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}
                        reject(data);
                      }
                    }
                  }
                )
              );
            }
            else{reject()}
          })
          return promise;
        }
      };
    })
    return self;
  }
}


export default RDActions_MiddleWare;
