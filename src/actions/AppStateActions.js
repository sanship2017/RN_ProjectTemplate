/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-11T08:15:38+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Anonymous080
* @Last modified time: 2016-07-11T10:14:32+07:00
*/

var ActionsTypes = require('./ActionsTypes');

var Debug = require('../Util/Debug');
/*
 * action creators
 */

 const AppStateActions={
   name:'AppStateActions',
   actionsList:{
     set:'APP_STATE_SET',
     setDirect:'APP_STATE_DIRECT_SET',
   },

   init:function(){
     var self = this;
     Object.keys(self.actionsList).forEach((key)=>{
       var obj = self.actionsList[key];
       // create function
       self[key] = function(data) {
               Debug.log(self.name +':'+key);
               return { type: ActionsTypes[obj],subtype:ActionsTypes.REQUEST_SUBTYPE.REQUEST, data:data };
             };
       self[key+'OnRequest'] = function(data) {
               Debug.log(self.name +':'+key+'OnRequest');
               return { type: ActionsTypes[obj],subtype:ActionsTypes.REQUEST_SUBTYPE.REQUEST, data:data };
             };
       self[key+'OnResult'] = function(subtype,data) {
               Debug.log(self.name +':'+key+'OnResult');
               return { type: ActionsTypes[obj],subtype:subtype, data:data };
             };
     })
     return self;
   },
 }.init();


module.exports=AppStateActions;
