/**
* @Author: Trần Quốc Phương <Anonymous080>
* @Date:   2016-07-06T15:07:06+07:00
* @Email:  tranphuong.080@gmail.com
* @Last modified by:   Anonymous080
* @Last modified time: 2016-07-11T14:39:57+07:00
*/

package com.projecttemplate;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rnfs.RNFSPackage;
import com.sensormanager.SensorManagerPackage;
import com.thudo.HotUpdateManager;
import com.thudo.RNBridgeReloaderPackage;
import com.thudo.RNIntentPackage;

import java.util.Arrays;
import java.util.List;

import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import me.neo.react.StatusBarPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    /**
     * Returns the name of the main module. Determines the URL used to fetch the JS bundle
     * from the packager server. It is only used when dev support is enabled.
     * This is the first file to be executed once the {@link ReactInstanceManager} is created.
     * e.g. "index.android"
     */
     @Override
    protected String getJSMainModuleName() {
      return "src/index.android";
    }

    // 2. Override the getJSBundleFile method in order to let
    // the CodePush runtime determine where to get the JS
    // bundle location from on each app start
    @Override
    protected String getJSBundleFile() {
      return HotUpdateManager.getInstance().getPathAvailableBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new RNBridgeReloaderPackage(),
              new RNFSPackage(),
              new RNDeviceInfo(),
              new StatusBarPackage(),
              new ExtraDimensionsPackage(),
              new OrientationPackage(),
              new SensorManagerPackage(),
              new RNSpinkitPackage(),
              new RNIntentPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
