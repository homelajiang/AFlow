package com.anglll.aflow.data.source;

import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.data.retrofit.RetrofitAPI;
import com.anglll.aflow.data.retrofit.api.RemoteService;

import java.util.List;

import io.reactivex.Flowable;

/**
 * Created by yuan on 2017/11/25 0025.
 */

public class AppRepository implements AppContract {
    private static volatile AppRepository instance;
    private static volatile RemoteService remoteService;

    public static AppRepository getInstance() {
        synchronized (AppRepository.class) {
            if (instance == null)
                instance = new AppRepository();
            return instance;
        }
    }

    private AppRepository() {
        remoteService = RetrofitAPI.getInstance().getRemoteService();
    }

    @Override
    public Flowable<List<MultiMedia>> getDiscovery() {
        return remoteService.getDiscovery();
    }

    @Override
    public Flowable<List<MultiMedia>> getRecommend() {
        return remoteService.getDiscovery();
    }

    @Override
    public Flowable<List<MultiMedia>> getRecommendCarousels() {
        return remoteService.getDiscovery();
    }
}
