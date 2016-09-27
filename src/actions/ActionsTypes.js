/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-08T09:37:56+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Anonymous080
* @Last modified time: 2016-07-11T10:20:01+07:00
*/

/*
 * action types
 */
const ActionsTypes={
  //
  APP_STATE_SET: 'APP_STATE_SET',
  APP_STATE_LIST:{
    LOADING:'LOADING',
    RUNNING:'RUNNING',
  },
  /** use for request to actions
  *
  */
  REQUEST_SUBTYPE:{
    REQUEST:'REQUEST',
    ERROR:'ERROR',
    SUCCESS:'SUCCESS',
  },
  //
}

module.exports= ActionsTypes
