package com.projecttemplate;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.KeyEvent;

import com.facebook.common.references.SharedReference;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.thudo.HotUpdateManager;

class UpdateTask implements Runnable {
    Activity mActivity;
    UpdateTask(Activity activity) { mActivity = activity; }
    @Override
    public void run() {
        String updateServer = mActivity.getResources().getString(R.string.update_server);
        HotUpdateManager.getInstance().checkUpdate(updateServer);
        if(HotUpdateManager.getInstance().getNewHybridVersion() > HotUpdateManager.getInstance().getHybridVersion()){
            HotUpdateManager.getInstance().update();
        }
    }
}

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState){

        HotUpdateManager.getInstance().init(this);

        if (!BuildConfig.DEBUG) {
            new Thread(new UpdateTask(this)).start();
        }

        super.onCreate(savedInstanceState);

        HotUpdateManager.getInstance().initReact(getReactNativeHost().getReactInstanceManager(this));

    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ProjectTemplate";
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && getReactNativeHost().getReactInstanceManager(this) != null) {
            getReactNativeHost().getReactInstanceManager(this).showDevOptionsDialog();
            if (getReactNativeHost().getReactInstanceManager(this).getCurrentReactContext()!= null)
                try {
                    getReactNativeHost().getReactInstanceManager(this).getCurrentReactContext()
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("hardwareMenuPress", null);
                }
                catch(SharedReference.NullReferenceException ex){
                    ex.printStackTrace();
                }
            return true;
        }

        return super.onKeyUp(keyCode, event);
    }
}
