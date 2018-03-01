package com.anglll.aflow;

import android.content.Context;

import com.facebook.fresco.helper.config.ImageLoaderConfig;
import com.facebook.imagepipeline.backends.okhttp3.OkHttpImagePipelineConfigFactory;
import com.facebook.imagepipeline.core.ImagePipelineConfig;

import okhttp3.OkHttpClient;

/**
 * Created by android_ls on 2017/6/12.
 */

public class PhoenixConfig extends ImageLoaderConfig {

    private static PhoenixConfig sImageLoaderConfig;

    protected PhoenixConfig(Context context) {
        super(context);
    }

    public static PhoenixConfig get(Context context) {
        if (sImageLoaderConfig == null) {
            synchronized (PhoenixConfig.class) {
                if (sImageLoaderConfig == null) {
                    sImageLoaderConfig = new PhoenixConfig(context);
                }
            }
        }
        return sImageLoaderConfig;
    }

    /**
     * 使用OKHttp3替换原有的网络请求
     * @return
     */
    @Override
    protected ImagePipelineConfig.Builder createConfigBuilder() {
        OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .retryOnConnectionFailure(false)
                .build();
        return OkHttpImagePipelineConfigFactory.newBuilder(mContext, okHttpClient);
    }

}