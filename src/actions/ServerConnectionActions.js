
var ActionsTypes = require('./ActionsTypes');

//LIB

//COMPONENTS
var Debug = require('../Util/Debug');



/*
 * action creators
 */

const ServerConnectionActions={


  connectToServerOnRequest:function(){
    Debug.log('ServerConnectionActions:connectToServerOnRequest');
    return { type: ActionsTypes.SERVER_CONNECT, subtype:ActionsTypes.REQUEST_SUBTYPE.REQUEST };
  },
  connectToServerOnResult:function(subtype,data){
    Debug.log('ServerConnectionActions:connectToServerOnResult:' + subtype);
    return { type: ActionsTypes.SERVER_CONNECT, subtype:subtype , data };
  },

  netInfoChangeOnRequest:function(data){
    Debug.log('ServerConnectionActions:netInfoChangeOnRequest');
    return { type: ActionsTypes.SERVER_CONNECT_NET_INFO_CHANGE, subtype:ActionsTypes.REQUEST_SUBTYPE.REQUEST,data:data };
  },
  netInfoChangeOnResult:function(subtype,data){
    Debug.log('ServerConnectionActions:netInfoChangeOnResult:' + subtype);
    return { type: ActionsTypes.SERVER_CONNECT_NET_INFO_CHANGE, subtype:subtype , data };
  },


  // disconnectFromServer: function() {
  //   Debug.log('ServerConnectionActions:disconnectFromServer:' );
  //   return { type: ActionsTypes.SERVER_CONNECT, subtype:ActionsTypes.REQUEST_SUBTYPE.ERROR  };
  // },

  // disconnectToServer: function(index) {
  //   return { type: ActionsTypes.ACTION2, index }
  // },

}

module.exports=ServerConnectionActions;
