package com.anglll.aflow.ui.discovery;

import android.support.v7.widget.RecyclerView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.data.model.Discovery;
import com.anglll.aflow.data.model.Feed;
import com.anglll.aflow.ui.epoxy.LinearLayoutTwoVGroup;
import com.anglll.aflow.ui.epoxy.models.VideoLargeModel_;

/**
 * Created by yuan on 2017/12/2 0002.
 */

public class DiscoveryController extends TypedEpoxyController<Discovery> {

    private DiscoverCallback callback;
    private RecyclerView.RecycledViewPool recyclerViewPool;

    DiscoveryController(DiscoverCallback callback, RecyclerView.RecycledViewPool recycledViewPool) {
        this.callback = callback;
        this.recyclerViewPool = recycledViewPool;
    }

    @Override
    protected void buildModels(Discovery data) {

        if (!data.getActivityList().isEmpty())
            add(new LinearLayoutTwoVGroup(data.getActivityList()));

        if (!data.getFeedList().isEmpty())
            for (Feed feed : data.getFeedList()) {
                add(new VideoLargeModel_()
                        .id(feed.getId())
                        .feed(feed));
            }
    }

    public interface DiscoverCallback {

    }
}
