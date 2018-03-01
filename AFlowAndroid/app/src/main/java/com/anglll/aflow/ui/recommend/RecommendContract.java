package com.anglll.aflow.ui.recommend;

import com.anglll.aflow.base.BasePresenter;
import com.anglll.aflow.base.BaseView;
import com.anglll.aflow.data.model.MultiMedia;

import java.util.List;

/**
 * Created by yuan on 2017/12/6 0006.
 */

public class RecommendContract {
    interface View extends BaseView<Presenter> {
        void getRecommend(List<MultiMedia> mediaList);

        void getRecommendFail();

        void getRecommendCarousels(List<MultiMedia> mediaList);

        void getRecommendCarouselsFail();
    }

    interface Presenter extends BasePresenter {
        void getRecommend();

        void getRecommendCarousels();
    }
}
