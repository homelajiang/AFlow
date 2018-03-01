package com.anglll.aflow.ui.epoxy;

import com.airbnb.epoxy.CarouselModel_;
import com.airbnb.epoxy.EpoxyModel;
import com.airbnb.epoxy.EpoxyModelGroup;
import com.anglll.aflow.R;
import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.ui.epoxy.models.MediaModel_;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuan on 2017/12/13 0013.
 */

public class LinearLayoutTwoVGroup extends EpoxyModelGroup {
    public LinearLayoutTwoVGroup(List<MultiMedia> medias) {
        super(R.layout.model_group_linearlayout_two_v, buildModels(medias));
        id();
    }

    private static List<EpoxyModel<?>> buildModels(List<MultiMedia> medias) {
        ArrayList<EpoxyModel<?>> models = new ArrayList<>();
        List<EpoxyModel<?>> modelList = new ArrayList<>();
        for (MultiMedia media : medias) {
            modelList.add(new MediaModel_()
                    .id(media.getContentId())
                    .multiMedia(media));
        }
        models.add(new LinearHCarouselModel_()
                .models(modelList));
        return models;
    }
}
