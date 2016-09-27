/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-08T08:38:52+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Trần Quốc Phương
* @Last modified time: 2016-07-12T15:36:13+07:00
*/

// LIB
var {
  Platform,
} = require('react-native');

var DeviceInfo = require('react-native-device-info');
var RNFS = require('react-native-fs');
// components
var Define = require('../Define');
var Debug = require('../Util/Debug');

var {socketConnection} = require('../components/modules/ConnectionsManager');


//

var ActionsTypes = require( '../actions/ActionsTypes');
var {popupActions} = require('../components/popups/Popup');
var DefaultPopup = require('../components/popups/DefaultPopup');

//var
var {globalVariableManager} = require('../components/modules/GlobalVariableManager');

// var styles={
//   error:{
//     backgroundColor:'fff',
//     borderWidth:1,
//     borderColor:'#000',
//     borderRadius:4,
//     width:Define.constants.widthScreen*2/3,
//     alignItems:'center',
//   },
//   success:{
//     backgroundColor:'fff',
//     borderWidth:1,
//     borderColor:'#000',
//     borderRadius:4,
//     width:Define.constants.widthScreen*2/3,
//     alignItems:'center',
//   },
// }


/**
 * Reducer Tracker.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
function Tracker(state ={} , action) {
  Debug.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',Debug.level.MARK);
  Debug.log('Reducers:Tracker:'+action.type+':'+action.subtype+':',Debug.level.USER_TRACKER);

  switch (action.subtype) {
    case ActionsTypes.REQUEST_SUBTYPE.SUCCESS:
      break;
    case ActionsTypes.REQUEST_SUBTYPE.ERROR:
      Debug.log(JSON.stringify(action.data),Debug.level.DATA_ERROR);

      switch (action.type) {
        case ActionsTypes.USER_USETOKENFROMSTORE:
        break;
        default:
          // display popup error
          if (action.data) {
            if (Define.constants.debug) {
              popupActions.setRenderContentAndShow(
                DefaultPopup,
                {
                  title:'ERROR:'+action.type,
                  description:JSON.stringify(action.data),
                  onPressPopup:()=>{popupActions.popPopup()}
                })
            }
          }
      }

      break;

    default:
  }

  // var info =undefined;
  // if (action.data&&action.data.res&&action.data.res.message && action.data.res.message!=='callback timeout') {
  //   info = action.data.res.message;
  // }
  // else if (action.data &&action.data.message && action.data.message!=='callback timeout') {
  //   info =action.data.message;
  // }
  // else if(action.data && action.data.err && action.data.err.body){
  //   info= action.data.err;
  // }
  // else if(action.data && action.data.body){
  //   info= action.data;
  // }
  //
  //
  // if (info !== undefined) {
  //   var buttonTitle = undefined;
  //   var link='';
  //   var extra={};
  //   if (info.acts && Array.isArray(info.acts)) {
  //     if (info.acts.length > 0) {
  //       buttonTitle = info.acts[0].label;
  //       link = info.acts[0].link;
  //       extra = info.acts[0].extra;
  //     }
  //   }
    // popupActions.setRenderContentAndShow(
    //   DefaultPopup,
    //   {
    //     title={info.head}
    //     description={info.body}
    //     disableClose={true}
    //     buttonTitle={buttonTitle}
    //     onPress={()=>{
    //       popupActions.popPopup();
    //       globalVariableManager.deepLinkManager.processLink({link:link,extra:extra})
    //     }}
    //     onPressPopup={()=>{popupActions.popPopup()}}
    //   },
    //   null,
    //   null,
    //   {
    //     group:3,
    //   })
  // }

  //
  Debug.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',Debug.level.MARK);

  // firstRunTracker=false;
  globalVariableManager.reduxManager.setState(state);

  return state;
}



module.exports= Tracker;
