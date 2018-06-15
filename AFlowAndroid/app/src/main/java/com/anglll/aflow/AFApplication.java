package com.anglll.aflow;

import android.app.Application;
import android.content.Context;
import android.os.StrictMode;
import android.support.multidex.MultiDex;

import com.facebook.fresco.helper.Phoenix;
import com.squareup.leakcanary.LeakCanary;


import uk.co.chrisjenx.calligraphy.CalligraphyConfig;

/**
 * Created by yuan on 2017/11/25 0025.
 */

public class AFApplication extends Application {
    private static AFApplication application;

    public static AFApplication getApplication() {
        return application;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        application = this;
        initLeakCanary();
        initFresco();
        initCalligraphy();
        enableStrictMode();
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    private void initCalligraphy() {
        CalligraphyConfig.initDefault(new CalligraphyConfig.Builder()
//                .setDefaultFontPath("fonts/Roboto-RobotoRegular.ttf")
                        .setDefaultFontPath("fonts/helvetica_neue.ttf")
                        .setFontAttrId(R.attr.fontPath)
                        .build()
        );
    }

    private void initLeakCanary() {
        if (LeakCanary.isInAnalyzerProcess(this)) {
            // This process is dedicated to LeakCanary for heap analysis.
            // You should not init your app in this process.
            return;
        }
        LeakCanary.install(this);
    }

    private void initFresco() {
        Phoenix.init(this, PhoenixConfig.get(this).getImagePipelineConfig());
    }

    private void enableStrictMode() {
        if (BuildConfig.DEBUG) {
            final StrictMode.ThreadPolicy.Builder threadPolicyBuilder = new StrictMode.ThreadPolicy.Builder()
                    .detectAll().penaltyLog();
            final StrictMode.VmPolicy.Builder vmPolicyBuilder = new StrictMode.VmPolicy.Builder()
                    .detectAll().penaltyLog();

            threadPolicyBuilder.penaltyFlashScreen();
            StrictMode.setThreadPolicy(threadPolicyBuilder.build());
            StrictMode.setVmPolicy(vmPolicyBuilder.build());
        }
    }
}
