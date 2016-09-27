
var ActionsTypes = require('./ActionsTypes');

var Debug = require('../Util/Debug');
/*
 * action creators
 */

 const StoreActions={
   name:'StoreActions',
   actionsList:{
     set:'STORE_SET',
     get:'STORE_GET',
     remove:'STORE_REMOVE',
   },

   init:function(){
     var self = this;
     Object.keys(self.actionsList).forEach((key)=>{
       var obj = self.actionsList[key];
       // create function
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


module.exports=StoreActions;
