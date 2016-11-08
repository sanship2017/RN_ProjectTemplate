
/*
 * action types
 */
const RDActionsTypes={

  Todo:{
    test:'TEST',
  },

  ServerConnection:{
    connect:'SERVER_CONNECT',
    disconnect:'SERVER_DISCONNECT',
    changeNetInfo:'SERVER_CONNECT_NET_INFO_CHANGE',
  },

  Store:{
    set:'STORE_SET',
    get:'STORE_GET',
    remove:'STORE_REMOVE',
  },

  AppState:{
    set: 'APP_STATE_SET',
    setDirect : 'APP_STATE_DIRECT_SET',
    constants:{
      APP_STATE_LIST:{
        LOADING:'LOADING',
        RUNNING:'RUNNING',
      },
      APP_STATE_DIRECT_LIST:{
        PORTRAIT:'PORTRAIT',
        LANDSCAPE:'LANDSCAPE',
        UNKNOWN: 'UNKNOWN'
      },
    }
  },

  //
  constants:{
    REQUEST_SUBTYPE:{
      REQUEST:'REQUEST',
      ERROR:'ERROR',
      SUCCESS:'SUCCESS',
    },
  }

}

module.exports= RDActionsTypes
