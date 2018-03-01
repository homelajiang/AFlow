package com.anglll.aflow.ui.discovery;

import android.support.v7.widget.RecyclerView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.ui.epoxy.models.VideoLargeModel_;

import java.util.List;

/**
 * Created by yuan on 2017/12/2 0002.
 */

public class DiscoveryController extends TypedEpoxyController<List<MultiMedia>> {

    private DiscoverCallback callback;
    private RecyclerView.RecycledViewPool recyclerViewPool;

    DiscoveryController(DiscoverCallback callback, RecyclerView.RecycledViewPool recycledViewPool) {
        this.callback = callback;
        this.recyclerViewPool = recycledViewPool;
    }

    @Override
    protected void buildModels(List<MultiMedia> data) {
        for (MultiMedia media : data) {
            add(new VideoLargeModel_()
                    .id(media.getContentId())
                    .multiMedia(media));
        }
    }

    public interface DiscoverCallback {

    }
}
