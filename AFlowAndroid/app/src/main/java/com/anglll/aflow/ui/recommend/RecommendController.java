package com.anglll.aflow.ui.recommend;

import com.airbnb.epoxy.AutoModel;
import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.R;
import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.data.model.Recommend;
import com.anglll.aflow.data.model.Title;
import com.anglll.aflow.ui.epoxy.LinearLayoutTwoVGroup;
import com.anglll.aflow.ui.epoxy.models.FeaturesModel_;
import com.anglll.aflow.ui.epoxy.models.TitleModel_;
import com.anglll.aflow.ui.epoxy.models.VideoModel_;

/**
 * Created by yuan on 2017/12/5 0005.
 */

public class RecommendController extends TypedEpoxyController<Recommend> {


    private final RecommendCallback callback;
    @AutoModel
    FeaturesModel_ featuresBlock;
    @AutoModel
    TitleModel_ carouselsTitle;
    @AutoModel
    TitleModel_ recommendTitle;

    RecommendController(RecommendCallback callback) {
        this.callback = callback;
    }

    @Override
    protected void buildModels(Recommend data) {

        add(featuresBlock);

        if (data.getCarousels() != null) {
            add(carouselsTitle
            .title(new Title("精品推荐", R.mipmap.ic_launcher_round)));
            add(new LinearLayoutTwoVGroup(data.getCarousels()));
        }

        if (data.getRecommends() != null) {
            add(recommendTitle
                    .title(new Title("每日推荐", R.mipmap.ic_launcher_round)));
            for (MultiMedia media : data.getRecommends()) {
                add(new VideoModel_()
                        .id(media.getContentId())
                        .multiMedia(media));
            }
        }
    }

    interface RecommendCallback {

    }
}
