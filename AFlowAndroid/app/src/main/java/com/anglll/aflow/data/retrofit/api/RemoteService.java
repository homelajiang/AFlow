package com.anglll.aflow.data.retrofit.api;

import com.anglll.aflow.data.model.MultiMedia;

import java.util.List;

import io.reactivex.Flowable;
import retrofit2.http.GET;

/**
 * Created by yuan on 2017/11/25 0025.
 */

public interface RemoteService {
    //获取推荐多媒体
    @GET("api/v1/discovery.json")
    Flowable<List<MultiMedia>> getDiscovery();
}
