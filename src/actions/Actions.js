
var ActionsTypes = require('./ActionsTypes');

var Debug = require('../Util/Debug');
/*
 * action creators
 */

 const Actions={
   name:'Actions',
   actionsList:{
     action:'ACTIONS',
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


module.exports=Actions;
