package com.anglll.aflow.ui.discovery;

import com.anglll.aflow.base.BasePresenter;
import com.anglll.aflow.base.BaseView;
import com.anglll.aflow.data.model.MultiMedia;

import java.util.List;

/**
 * Created by yuan on 2017/12/4 0004.
 */

public class DiscoveryContract {
    interface View extends BaseView<Presenter> {
        void getDiscovery(List<MultiMedia> mediaList);
        void getDiscoveryFail();
    }

    interface Presenter extends BasePresenter {
        void getDiscovery();
    }
}
