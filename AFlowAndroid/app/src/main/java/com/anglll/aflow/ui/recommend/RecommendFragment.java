package com.anglll.aflow.ui.recommend;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.airbnb.epoxy.EpoxyController;
import com.airbnb.epoxy.EpoxyModel;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseFragment;
import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.data.model.Recommend;
import com.anglll.aflow.ui.discovery.DiscoveryDecoration;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by yuan on 2017/11/30.
 */

public class RecommendFragment extends BaseFragment implements RecommendContract.View {
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;
    private RecommendController controller = new RecommendController(null);
    private Recommend recommend = new Recommend();
    private RecommendContract.Presenter presenter;


    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.common_recyclerview, container, false);
        ButterKnife.bind(this, view);
        initView();
        return view;
    }

    private void initView() {
        controller.setSpanCount(2);
        GridLayoutManager manager = new GridLayoutManager(getContext(), 2);
        manager.setSpanSizeLookup(controller.getSpanSizeLookup());
        mRecyclerView.setLayoutManager(manager);
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());
        new RecommendPresenter(this);
        updateController();
        presenter.getRecommend();
        presenter.getRecommendCarousels();
    }

    private void updateController() {
        controller.setData(recommend);
    }

    @Override
    public void setPresenter(RecommendContract.Presenter presenter) {
        this.presenter = presenter;
    }

    @Override
    public void getRecommend(List<MultiMedia> mediaList) {
        recommend.setRecommends(mediaList);
        updateController();
    }

    @Override
    public void getRecommendFail() {

    }

    @Override
    public void getRecommendCarousels(List<MultiMedia> mediaList) {
        recommend.setCarousels(mediaList);
        updateController();
    }

    @Override
    public void getRecommendCarouselsFail() {

    }
}
