package com.anglll.aflow.ui.recommend;

import com.airbnb.epoxy.AutoModel;
import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.data.model.Discovery;
import com.anglll.aflow.ui.epoxy.models.FeaturesModel_;
import com.anglll.aflow.ui.epoxy.models.TitleModel_;

/**
 * Created by yuan on 2017/12/5 0005.
 */

public class RecommendController extends TypedEpoxyController<Discovery> {


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
    protected void buildModels(Discovery data) {

        add(featuresBlock);

/*        if (data.getCarousels() != null) {
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
        }*/
    }

    interface RecommendCallback {

    }
}
