// @flow
// var _ = require('lodash')
import axios from 'axios';
var RDActionsTypes = require('./RDActionsTypes');
// let util = require('react-native-util')
// LIB
var TimeoutCallback = require('timeout-callback');

// components
var Define = require('../Define');
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');

// var {socketConnection} = require('../components/modules/ConnectionsManager');
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

          var addUrl=''
          if (obj.onAddUrl) {
            addUrl = obj.onAddUrl(argTemp,getState);
          }

          var req = {};
          // req config
          if (obj.onArg) {
            req = obj.onArg(argTemp,getState);
          }else{
            req=argTemp;
          }

          //
          var promise = new Promise((resolve,reject)=>{
            var data ={
              arg: argTemp
            };
            // check limitProcess
            if ( obj.limitProcess !==0 && getState()[this.sortName] && getState()[this.sortName][actionName]  &&
              getState()[this.sortName][actionName].loading >= obj.limitProcess) {
              Debug.log(preTextLog+':reach limitProcess:' + getState()[this.sortName][actionName].loading,Debug.level.PROCESS);
              data={
                arg:argTemp,
                err:'react limitProcess',
              }
              reject(data)
              return;
            }

            if(setState) {dispatch(RDActions[this.sortName][actionName+'OnRequest'](data)); }
            if(obj.showLoading) {dispatch(RDActions['AppState']['showLoadingOnRequest']({show:true}))}
            var methode=()=>{};
            var methodeText='get';
            let queryParam ='';
            switch (obj.methode) {
              case 'get':{}
              case 'GET':{
                methode = axios.get;
                methodeText='get';
                queryParam = '?' + Util.serialize(req.query ?req.query : (req.body?req.body:req))
                if (queryParam === '?') {
                  queryParam = ''
                }
                break;
              }
              case 'post':{}
              case 'POST':{
                methode = axios.post
                methodeText='post';
                break;
              }
              case 'patch':{}
              case 'PATCH':{
                methode = axios.patch
                methodeText='patch';
                break;
              }
              case 'del':{}
              case 'DEL':{}
              case 'DELETE':{}
              case 'delete':{
                methode = axios.delete
                methodeText='delete';
                queryParam = '?' + Util.serialize(req.query ?req.query : (req.body?req.body:req))
                if (queryParam === '?') {
                  queryParam = ''
                }
                break;
              }
              default:

            }

            // if(query.indexOf('?') >0){
            //   if (queryParam.indexOf('?') == 0) {
            //     queryParam = queryParam.slice(1);
            //     queryParam = '&' + queryParam;
            //   }
            // }

            let preLinkApi = '';
            // let apiVersion = obj.apiVersion ? obj.apiVersion : Define.constants.apiVersion;
            // let apiVersion = obj.apiVersion;
            // switch (apiVersion) {
            //   case 1:{
            //     preLinkApi = '/api/v1.0';
            //     break;
            //   }
            //   case 2:{
            //     preLinkApi = '/api/v2.0';
            //     break;
            //   }
            //   default:{
            //     if (typeof(apiVersion) === 'string') {
            //       preLinkApi = '/api/v'+apiVersion;
            //     }else{
            //       preLinkApi = '/api/v1.0';
            //     }
            //
            //   }
            // }

            let serverAddr = obj.serverAddr || Define.constants.serverAddr;

            // Debug.log(preTextLog+':'+`${serverAddr}${preLinkApi}${query}`+':'+JSON.stringify(req));

            var authorizationInfo={}
            if (getState().User.loginState && getState().User.accessToken) {
              authorizationInfo.Authorization = getState().User.accessToken
            }
            Debug.log2('authorizationInfo',authorizationInfo,Debug.level.PROCESS)

            Debug.log(preTextLog+':'+query+':'+methodeText+':'+JSON.stringify(req),Debug.level.PROCESS);

            Debug.log(`${serverAddr}${preLinkApi}${query}${addUrl}${queryParam}`,Debug.level.PROCESS);

            axios.request({
              method:methodeText,
              url:`${serverAddr}${preLinkApi}${query}${addUrl}${queryParam}`,
              data:((methodeText === 'post') || (methodeText === 'patch'))?req:undefined,
              headers:{
                // 'x-access-token' : Define.constants.serverApiToken ,
                'Content-Type':'application/json',
                ...authorizationInfo,
                ...obj.headers
              }
            })
            .then((response)=>{
              if(obj.showLoading) {dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))}
              Debug.log(preTextLog+':callback:'+`${serverAddr}${preLinkApi}${query}${addUrl}`+':'+JSON.stringify(req),Debug.level.PROCESS);
              // console.log(response)
              // if(response.status === 200 || response.status === 201) {
                var res = response.data;
                Debug.log(preTextLog +'res:');
                if (self.logRes) {
                  Debug.log(res,Debug.level.PROCESS);
                }
                data={
                  arg:argTemp,
                  res:res
                }
                var onDoneRet = true;
                if (obj.onDone) {onDoneRet = obj.onDone.call(self, dispatch,getState,data);}
                if (onDoneRet) {
                  if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS,data));}
                  resolve(data);
                }else{
                  if(setState) {dispatch(RDActions[this.sortName][actionName+'OnResult'](RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR,data));}
                  reject(data);
                }

                if (obj.onFinish) {obj.onFinish.call(self, dispatch,getState,data);}

              // }else{
              //   return Promise.reject(response)
              // }
            })
            .catch((err)=>{
              if(obj.showLoading) {dispatch(RDActions['AppState']['showLoadingOnRequest']({show: false}))}

              Debug.log(preTextLog+':err:'+`${serverAddr}${preLinkApi}${query}${addUrl}`+':'+JSON.stringify(req),Debug.level.ERROR);

              // Debug.log(preTextLog +'err:',Debug.level.ERROR);
              Debug.log(err,Debug.level.ERROR);
              err.message && Debug.log(err.message,Debug.level.ERROR);
              data={
                arg:argTemp,
                // err:util.inspect(err),
                // err:'err',
                err:err.response?JSON.stringify(err.response.data):JSON.stringify(err),
                errObj:err.response?err.response.data:err.message
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

              // if (Define.debug) {
              //   throw err
              // }
            })
          })
          return promise;
        }
      };
    })
    return self;
  }
}


export default RDActions_MiddleWare;
