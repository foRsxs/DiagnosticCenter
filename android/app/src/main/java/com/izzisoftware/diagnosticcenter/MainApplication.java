package com.izzisoftware.diagnosticcenter;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNDeviceInfo(),
        new RNCameraPackage(),
        new AsyncStoragePackage(),
        new RNCWebViewPackage(),
        new LinearGradientPackage(),
        new RNGestureHandlerPackage(),
        new RNFetchBlobPackage(),
        new ReactNativeOneSignalPackage(),
        new RNSharePackage(),
        new RNLanguagesPackage(),
        new FingerprintAuthPackage(),
        new SplashScreenReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  
  @Override
  public String getFileProviderAuthority() {
    return "com.izzisoftware.diagnosticcenter.provider";
  }
}
