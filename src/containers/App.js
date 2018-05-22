//LIB
import React from 'react';
import {
    View,
    NativeModules,
    NetInfo,
    DeviceEventEmitter,
    ToastAndroid,
    BackHandler,
    AppState,
    NativeAppEventEmitter,
    PushNotificationIOS,
    AlertIOS,
    Platform,
    Dimensions,
    InteractionManager,
    UIManager,
    StyleSheet,
    StatusBar
} from 'react-native';
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

import * as Animatable from 'react-native-animatable';
import RNRestart from 'react-native-restart';
import GiftedSpinner from 'react-native-gifted-spinner';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import {
    Scene,
    Reducer,
    Router,
    Switch,
    TabBar,
    Modal,
    Schema,
    Actions
} from 'react-native-router-flux';
// const RouterWithRedux = connect()(Router);
var Orientation = require('react-native-orientation');
var SensorManager = NativeModules.SensorManager;
var Spinner = require('react-native-spinkit');
var ExtraDimensions = require('react-native-extra-dimensions-android');
var DismissKeyboard = require('dismissKeyboard');
var StatusBarAndroid = require('react-native-android-statusbar');
// var SQLite = require('react-native-sqlite-storage');
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

var RNIntent = NativeModules.RNIntent;
var RNHotUpdate = NativeModules.RNHotUpdate;
var DeviceInfo = require('react-native-device-info');

var RNFS = require('react-native-fs');

// action
var RDActionsTypes = require('../actions/RDActionsTypes');
var RDActions = require('../actions/RDActions');

var TempActions_MiddleWare = require('../actions/TempActions_MiddleWare');
//Component
var Debug = require('../Util/Debug');
var Util = require('../Util/Util');
var Themes = require('../Themes');
var Define = require('../Define');
var Include = require('../Include');

import ButtonWrap from '../components/elements/ButtonWrap';

var {
    globalVariableManager
} = require('../components/modules/GlobalVariableManager');
var {
    PopupManager,
    popupActions,
    popupConst
} = require('../components/popups/PopupManager');

import LoadingView from '../components/elements/LoadingView';
// var SCTVFilmsSideMenu = require('../components/elements/SCTVFilmsSideMenu');
// screens
import HomeScreen from '../components/screens/HomeScreen';
import SecondScreen from '../components/screens/SecondScreen';
import TemplateScreen from '../components/screens/TemplateScreen';
var screenList = [HomeScreen, SecondScreen];
//popups
import DefaultPopup from '../components/popups/DefaultPopup';
import FadeDownDefaultPopup from '../components/popups/FadeDownDefaultPopup';
//variable

var App = React.createClass({
    hideContentState: false,
    hideContent: function(flag = true) {
        var self = this;
        if (flag) {
            // InteractionManager.runAfterInteractions(() => {
            self.refs.contentView.transitionTo({ opacity: 0 }, 200);
            // })
            // self.refs.tutorialView.transitionTo({opacity:0.8},1200)
        } else {
            self.refs.contentView.transitionTo({ opacity: 1 }, 200);
            // self.refs.tutorialView.transitionTo({opacity:0},600)
        }

        self.hideContentState = flag;
    },
    // renderSideMenu:function(){
    //   var self=this;
    //    return(
    //      <SideMenu rootView={self}/>
    //    )
    //  },
    updateSideMenu: function() {
        //  const self = this;
        //  if(self._sideMenuContent) {
        //    self._sideMenuContent.getWrappedInstance().forceUpdate();
        //  }
    },
    drawSideMenu: function(flag = true) {
        //   var self = this;
        //   if (self.sideMenu) {
        //     self.sideMenu.openMenu(flag);
        //   }
    },

    handleAppStateChange: function(currentAppState) {
        var self = this;
        const { dispatch, navigator } = this.props;
        Debug.log(
            'handleAppStateChange ' + currentAppState,
            Debug.level.USER_TRACKER
        );
        var widthScreen = Dimensions.get('window').width;
        var heightScreen = Dimensions.get('window').height;

        self.handleAppOrientation(
            widthScreen < heightScreen ? 'PORTRAIT' : 'LANDSCAPE'
        );

        switch (currentAppState) {
            case 'active': {
                this.checkUpdate();
                break;
            }
            case 'background': {
                if (globalVariableManager.needRestart) {
                    RNIntent.exit();
                }
                break;
            }
            case 'inactive': {
                if (globalVariableManager.needRestart) {
                    RNIntent.exit();
                }
                break;
            }
            default:
        }
    },
    screenList: [],
    createScreen: function() {
        var self = this;
        self.screenList = screenList.map(current => {
            var currentTemp = current;
            if (current.WrappedComponent) {
                currentTemp = current.WrappedComponent;
            }
            return (
                <Scene
                    key={currentTemp.componentName}
                    title={currentTemp.componentName}
                    component={current}
                    onEnter={scene => {}}
                    //backButtonImage={Define.assets.Menu.icon_back}
                    {...currentTemp.sceneConfig}
                    bodyStyle={Themes.current.screen.bodyViewWrap}
                    rootView={self}
                />
            );
        });
    },

    processCrashDone: false,
    processCrash: function() {
        var self = this;
        var { dispatch, user } = self.props;
        if (self.processCrashDone) {
            return;
        }
        self.processCrashDone = true;

        var path = Define.constants.crashLog;

        // RNFS.readFile(path, 'utf8')
        //     .then(content => {
        //         if (content !== 'SENDED') {
        //             Debug.log('show popup crash');
        //             popupActions.setRenderContentAndShow(
        //                 DefaultPopup,
        //                 {},
        //                 () => {
        //                     return (
        //                         <DefaultPopup
        //                             disableClose={false}
        //                             title={'Rất xin lỗi'}
        //                             description={
        //                                 'Ứng dụng đã gặp lỗi trong phiên làm việc trước, xin vui lòng gửi thông tin chi tiết cho chúng tôi để hoàn thiện ứng dụng'
        //                             }
        //                             buttonTitle={'Đồng ý'}
        //                             onPress={() => {
        //                                 popupActions.popPopup(
        //                                     undefined,
        //                                     undefined,
        //                                     undefined,
        //                                     undefined,
        //                                     [popupConst.INFO_GROUP]
        //                                 );
        //                                 // show FeedBackPopup
        //                                 //popupActions.setRenderContentAndShow(
        //                                 //  FeedBackPopup,
        //                                 //  {
        //                                 //    infoText:content
        //                                 //  });
        //                                 // write 'SENDED' to crash file
        //                                 RNFS.writeFile(path, 'SENDED', 'utf8');
        //                             }}
        //                         >
        //                             <Include.Text
        //                                 style={{
        //                                     left: 0,
        //                                     right: 0,
        //                                     marginVertical: 5,
        //                                     alignSelf: 'center',
        //                                     color: '#000'
        //                                 }}
        //                             >
        //                                 (Chi tiết lỗi đã được đính kèm với nội
        //                                 dung góp ý, bạn có thể để trống nội
        //                                 dung)
        //                             </Include.Text>
        //                         </DefaultPopup>
        //                     );
        //                 },
        //                 {
        //                     tapToExit: false
        //                 }
        //             );

        //             if (!Define.constants.debug) {
        //                 // write 'SENDED' to crash file
        //                 RNFS.writeFile(path, 'SENDED', 'utf8');
        //             }
        //         }
        //     })
        //     .catch(ex => {});
    },
    processUpdateInfo: function(arg) {
        Debug.log('processUpdateInfo');
        var self = this;
    },
    checkUpdate: function() {
        if (Platform.OS === 'android') {
            setTimeout(() => {
                RNHotUpdate.checkUpdate(
                    Define.constants.serverAddr + '/update-release'
                )
                    .then(arg => {
                        Debug.log('checkUpdate:done', arg);
                        RNHotUpdate.update()
                            .then(arg => {
                                console.log('');
                            })
                            .catch(e => {
                                Debug.log(e, Debug.level.ERROR);
                            });
                    })
                    .catch(err => {
                        Debug.log2('checkUpdate:err', err, Debug.level.ERROR);
                    });

                // RNHotUpdate.getCheckUpdateInfo()
            });
        }
    },
    getVersion: function() {
        if (Platform.OS === 'android') {
            RNHotUpdate.getVersion().then(arg => {
                Define.config.currentHybridVersion = arg.currentHybridVersion;
                Define.config.currentNativeVersion = arg.currentNativeVersion;
            });
        }
    },
    preProcessWhenStartDone: false,
    preProcessWhenStart: function() {
        Debug.log('preProcessWhenStart');
        var self = this;
        var { dispatch, user } = self.props;

        self.preProcessWhenStartDone = true;

        // GcmAndroid.requestPermissions();

        this.checkUpdate();
        this.getVersion();

        //  get config
        //   dispatch(AppStateActions_MiddleWare.getConfig())
        //   dispatch(AppStateActions_MiddleWare.getDistributors());
        // processCrash
        self.processCrash();

        // auto login
        //   dispatch(StoreActions_MiddleWare.get({key:'UserName'},false))
        //   .then((data)=>{
        //     var phoneNumber = data.res;
        //     dispatch(StoreActions_MiddleWare.get({key:'Password'},false))
        //     .then((data2)=>{
        //       var password = data2.res;
        //       dispatch(UserActions_MiddleWare.signin({
        //           username:phoneNumber,
        //           password:password,
        //         }))
        //     });
        //   });

        self.processDeepLinkFromNotify();
    },
    handleAppOrientation: function(specificOrientationIn) {
        var self = this;
        var { dispatch } = this.props;
        var specificOrientation = specificOrientationIn;
        Debug.log2(
            'specificOrientation',
            specificOrientation,
            Debug.level.USER_TRACKER
        );
        let shouldUpdateVideoPopup = true;
        // iOS only
        if (specificOrientation === 'PORTRAITUPSIDEDOWN') {
            Debug.log2(
                'currentDirect',
                globalVariableManager.reduxManager.state.AppState.currentDirect
            );
            if (
                globalVariableManager.reduxManager.state.AppState
                    .currentDirect ===
                RDActionsTypes.AppState.constants.APP_STATE_DIRECT_LIST
                    .LANDSCAPE
            ) {
                specificOrientation = 'PORTRAIT';
            } else if (
                globalVariableManager.reduxManager.state.AppState
                    .currentDirect ===
                RDActionsTypes.AppState.constants.APP_STATE_DIRECT_LIST.UNKNOWN
            ) {
                if (
                    Define.constants.widthScreen < Define.constants.heightScreen
                ) {
                    return;
                } else {
                    specificOrientation = 'PORTRAIT';
                }
            } else {
                return;
            }
        } else if (specificOrientation === 'UNKNOWN') {
            return;
        }
        // end iOS only

        var newVideoState = '';

        if (
            (popupActions.getVideoPopupState() === 'NORMAL' ||
                popupActions.getVideoPopupState() === 'FORCE_FULLSCREEN') &&
            specificOrientation === 'LANDSCAPE'
        ) {
            newVideoState = 'FULLSCREEN';
        }

        if (
            specificOrientation === 'PORTRAIT' &&
            Define.constants.widthScreen < Define.constants.heightScreen
        ) {
            if (Platform.OS === 'ios') {
                shouldUpdateVideoPopup = false;
            }
        } else if (
            specificOrientation === 'LANDSCAPE' &&
            Define.constants.widthScreen > Define.constants.heightScreen
        ) {
            if (Platform.OS === 'ios') {
                shouldUpdateVideoPopup = false;
            }
        } else if (specificOrientation === 'UNKNOWN') {
        } else {
            let temp = Define.constants.widthScreen;
            Define.constants.widthScreen = Define.constants.heightScreen;
            Define.constants.heightScreen = temp;
        }

        Define.constants.availableHeightScreen =
            Platform.OS === 'ios'
                ? Define.constants.heightScreen
                : Define.constants.heightScreen -
                  Define.constants.heightOfStatusBarAndroid;
        Themes.init();
        if (
            specificOrientation !==
            globalVariableManager.reduxManager.state.AppState.currentDirect
        ) {
            dispatch(
                RDActions.AppState.setDirectOnRequest(
                    RDActionsTypes.AppState.constants.APP_STATE_DIRECT_LIST[
                        specificOrientation
                    ]
                )
            );
        }

        if (shouldUpdateVideoPopup) {
            if (
                specificOrientation === 'PORTRAIT' &&
                popupActions.getVideoPopupState() === 'FULLSCREEN'
            ) {
                popupActions.setVideoPopupState('NORMAL');
            } else {
                popupActions.setVideoPopupState(newVideoState);
            }
        }
    },
    processDeepLinkFromNotifyDone: false,
    startDeepLink: '',
    startExtras: {},
    processDeepLinkFromNotify: function() {
        var self = this;
        // check intent (start from link or notify)
        if (self.processDeepLinkFromNotifyDone) {
            return;
        }

        Debug.log('Process deeplink when start app from notity');
        globalVariableManager.deepLinkManager.processLink({
            link: self.startDeepLink,
            extras: self.startExtras
        });

        self.processDeepLinkFromNotifyDone = true;
    },
    componentWillMount: function() {
        var self = this;
        var { dispatch } = this.props;
        // regis
        globalVariableManager.deepLinkManager.setRootView(self);
        globalVariableManager.reduxManager.setDispatch(dispatch);

        // dispatch(RDActions.AppState.preSetState())

        globalVariableManager.rootView = self;

        if (!Define.constants.debug) {
            ErrorUtils.setGlobalHandler(error => {
                var errorStack = new Error();
                Debug.log(
                    '!!!!!!!!!!!!!!GLOBAL ERROR HANDLER!!!!!!!!!!!!!!!!!!!!!!',
                    Debug.level.ERROR
                );
                Debug.log(error, Debug.level.ERROR);
                Debug.log(errorStack.stack, Debug.level.ERROR);
                Debug.log(
                    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
                    Debug.level.ERROR
                );
                var path = Define.constants.crashLog;
                var crashDescription = '';
                crashDescription +=
                    Util.date2String(new Date(), 'mm/dd - HH:MM:SS') +
                    ' : ' +
                    error +
                    ':' +
                    JSON.stringify(error);
                crashDescription += '\r\n';
                crashDescription += '\r\n' + errorStack.stack;
                crashDescription += '\r\n';
                // write trackerLog
                Debug.trackerLog.forEach(current => {
                    crashDescription += '\r\n' + current;
                });

                var obj2Write = {};
                obj2Write.hybridVersionCrash = Define.constants.hybridVersion;
                obj2Write.error = {
                    column: error.column,
                    line: error.line,
                    name: '' + error
                };
                obj2Write.crashDescription = crashDescription;
                var string2Write = JSON.stringify(obj2Write);
                RNFS.writeFile(path, string2Write, 'utf8')
                    .then(() => {
                        Debug.log('CrashLog WRITTEN!', Debug.level.ERROR);
                        // NativeModules.BridgeReloader.reload();
                        RNRestart.Restart();
                    })
                    .catch(err => {
                        Debug.log(err.message, Debug.level.ERROR);
                        // NativeModules.BridgeReloader.reload();
                        RNRestart.Restart();
                    });
            });
        }

        //
        this.reducerCreate = params => {
            const defaultReducer = new Reducer(params);
            return (state, action) => {
                setTimeout(() => {
                    dispatch(action);
                });
                return defaultReducer(state, action);
            };
        };

        // events
        NetInfo.addEventListener('change', connectionInfo => {
            Debug.log(
                'Connection state change: ' + connectionInfo,
                Debug.level.USER_TRACKER
            ); // NONE , WIFI, MOBILE
            dispatch(
                RDActions.ServerConnection.changeNetInfoOnRequest(
                    connectionInfo
                )
            );
        });

        Orientation.addOrientationListener(self.handleAppOrientation);

        // update task
        DeviceEventEmitter.addListener('HotUpdateManager:checkUpdate', ev => {
            Debug.log2(
                'HotUpdateManager:checkUpdate',
                ev,
                Debug.level.USER_TRACKER
            );
        });
        DeviceEventEmitter.addListener(
            'HotUpdateManager:checkUpdateDone',
            arg => {
                Debug.log2(
                    'HotUpdateManager:checkUpdateDone',
                    arg,
                    Debug.level.USER_TRACKER
                );
                if (arg.newHybridVersion > arg.currentHybridVersion) {
                    RNHotUpdate.update()
                        .then(arg => {
                            console.log('');
                        })
                        .catch(e => {
                            Debug.log(e, Debug.level.ERROR);
                        });
                }
            }
        );
        DeviceEventEmitter.addListener('HotUpdateManager:download', ev => {
            Debug.log2(
                'HotUpdateManager:download',
                ev,
                Debug.level.USER_TRACKER
            );
        });
        var time2ShowToast = Date.now();
        DeviceEventEmitter.addListener('HotUpdateManager:downloading', ev => {
            Debug.log2(
                'HotUpdateManager:downloading ',
                ev,
                Debug.level.USER_TRACKER
            );
            if (Date.now() - time2ShowToast > 1000) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(
                        'Update downloading ' +
                            Math.floor(ev.byte / 1024).toString() +
                            ' kb',
                        ToastAndroid.SHORT
                    );
                }
                time2ShowToast = Date.now();
            }
        });
        DeviceEventEmitter.addListener('HotUpdateManager:downloadDone', ev => {
            Debug.log2(
                'HotUpdateManager:downloadDone',
                ev,
                Debug.level.USER_TRACKER
            );
        });
        DeviceEventEmitter.addListener('HotUpdateManager:updateDone', arg => {
            Debug.log2(
                'HotUpdateManager:updateDone',
                arg,
                Debug.level.USER_TRACKER
            );
            if (Platform.OS === 'android') {
                ToastAndroid.show('Update completed', ToastAndroid.SHORT);
                globalVariableManager.needRestart = true;
            }
            // if (!self.processUpdateInfoDone ) {
            //     self.processUpdateInfo(arg);
            // }
        });
        //key
        BackHandler.addEventListener('hardwareBackPress', () => {
            // must update
            var { navigator } = self.props;
            //  clearTimeout(globalVariableManager.hideContentTimeput);
            if (self.hideContentState) {
                globalVariableManager.rootView.hideContent(false);
            }
            if (popupActions.popPopup()) {
                return true;
            } else if (popupActions.getPopupStackSize(0) > 0) {
                popupActions.popPopup(0, true, 0);
                return true;
            } else if (self.sideMenu && self.sideMenu.isOpen) {
                self.drawSideMenu(false);
                return true;
            } else if (
                !(
                    globalVariableManager.reduxManager.state.AppState
                        .currentState ===
                    RDActionsTypes.AppState.constants.APP_STATE_LIST.LOADING
                )
            ) {
                if (
                    Actions.currentScene !== 'HomeScreen' &&
                    Actions.currentScene !== 'TemplateScreen'
                ) {
                    Actions.pop();
                    return true;
                    //  if(Actions.pop()) {
                    //    return true;
                    //  }else{
                    //   //  RNIntent.moveTaskToBack();
                    //   //  return true;
                    //   // dispatch(UserActions_MiddleWare.signout())
                    //   // .then(()=>{
                    //     RNIntent.exit();
                    //   // })
                    //   // .catch(()=>{
                    //   //   RNIntent.exit();
                    //   // })
                    //    return true;
                    //  }
                } else {
                    //  if (globalVariableManager.SCTVScrollableTabBarContainer &&
                    //         globalVariableManager.SCTVScrollableTabBarContainer.tabFocus !== 0 &&
                    //         globalVariableManager.SCTVScrollableTabBarContainer.refs.ScrollableTabView
                    //       ) {
                    //     globalVariableManager.SCTVScrollableTabBarContainer.refs.ScrollableTabView.goToPage(0);
                    //     return true;
                    //  }else{
                    //  RNIntent.moveTaskToBack();
                    //  return true;
                    //  dispatch(UserActions_MiddleWare.signout())
                    //  .then(()=>{
                    RNIntent.exit();
                    //  })
                    //  .catch(()=>{
                    //    RNIntent.exit();
                    //  })
                    return true;
                    //  }
                }
            } else {
                //  RNIntent.moveTaskToBack();
                //  return true;
                // dispatch(UserActions_MiddleWare.signout())
                // .then(()=>{
                RNIntent.exit();
                // })
                // .catch(()=>{
                //   RNIntent.exit();
                // })
                return true;
            }

            // return false;
        });

        DeviceEventEmitter.addListener('hardwareMenuPress', () => {
            // self.drawSideMenu();
        });
        AppState.addEventListener('change', self.handleAppStateChange);

        self.createScreen();
    },
    render: function() {
        var self = this;
        const { dispatch } = this.props;
        var content;
        if (
            globalVariableManager.reduxManager.state.AppState.currentState ===
            RDActionsTypes.AppState.constants.APP_STATE_LIST.LOADING
        ) {
            content = <View />;
        } else {
            // disableGestures={self.isDisableSideMenu()}

            // <SideMenu
            //     ref={(sideMenu)=>{this.sideMenu=sideMenu;}}
            //     onChange={(state)=>{
            //       Debug.log('SCTVFilmsSideMenu:'+state,Debug.level.USER_TRACKER)
            //       globalVariableManager.sideMenuMoving = false;
            //       self.sideMenuState=state;
            //       if (state) {
            //         popupActions.popAllPopup(0,true,0);
            //         // popupActions.popAllPopup(0,true,1);
            //
            //         self.updateSideMenu();
            //
            //         // if (user.userInfo.signinState) {
            //         //   InteractionManager.runAfterInteractions(() => {
            //         //     dispatch(UserActions_MiddleWare.getProfile());
            //         //   })
            //         // }
            //       } else {
            //         DismissKeyboard();
            //       }
            //     }}
            //     onMove={()=>{
            //       globalVariableManager.sideMenuMoving = true;
            //     }}
            //     openMenuOffset={Themes.current.factor.openSideMenuOffset}
            //     isOpen={self.sideMenuState}
            //
            //     menu={self.renderSideMenu()}>

            content = (
                <Router
                    createReducer={this.reducerCreate}
                    sceneStyle={StyleSheet.flatten(
                        Themes.current.screen.appBackground
                    )}
                    navigationBarStyle={Themes.current.screen.NavBar}
                    backAndroidHandler={() => {}}
                >
                    <Scene key="root">{self.screenList}</Scene>
                </Router>
            );
        }

        return (
            <View
                renderToHardwareTextureAndroid={true}
                style={Themes.current.screen.appBackground}
            >
                {Platform.OS === 'android' ? null : <StatusBar hidden={true} />}
                <Animatable.View
                    onStartShouldSetResponderCapture={() => {
                        if (self.hideContentState) {
                            globalVariableManager.rootView.hideContent(false);
                            return true;
                        }
                        return false;
                    }}
                    ref="contentView"
                    style={{ flex: 1 }}
                >
                    {content}
                </Animatable.View>
                <PopupManager rootView={self} />
                {/* <LoadingView /> */}
            </View>
        );
    },

    componentDidMount: function() {
        var self = this;
        var { dispatch } = self.props;
        if (Platform.OS === 'android') {
            StatusBarAndroid.setHexColor(Themes.current.factor.backgroundColor);
        }

        InteractionManager.runAfterInteractions(() => {
            self.preProcessWhenStart();
        });

        //  // util connected
        //  if (globalVariableManager.socketConnection.getConnectState()) {
        //    dispatch(AppStateActions.setOnRequest(RDActionsTypes.AppState.constants.APP_STATE_LIST.RUNNING));
        //    self.preProcessWhenStart();
        //  }
        //  else{
        //    globalVariableManager.socketConnection.on('connect', function(){
        //      dispatch(AppStateActions.setOnRequest(RDActionsTypes.AppState.constants.APP_STATE_LIST.RUNNING));
        //        self.preProcessWhenStart();
        //      });
        //  }
    }
});

/**
 * [selectActions description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function selectActions(state) {
    return {
        appState: state.AppState,
        navigator: state.Navigator,
        serverConnection: state.ServerConnection
    };
}

module.exports = connect(selectActions)(App);
