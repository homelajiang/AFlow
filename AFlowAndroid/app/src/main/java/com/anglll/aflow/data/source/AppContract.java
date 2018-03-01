package com.anglll.aflow.data.source;

import com.anglll.aflow.data.model.MultiMedia;

import java.util.List;

import io.reactivex.Flowable;

/**
 * Created by yuan on 2017/11/25 0025.
 */

public interface AppContract {
    //获取多媒体信息
    Flowable<List<MultiMedia>> getDiscovery();

    //获取推荐的多媒体信息
    Flowable<List<MultiMedia>> getRecommend();

    //获取推荐的头部列表
    Flowable<List<MultiMedia>> getRecommendCarousels();
}
