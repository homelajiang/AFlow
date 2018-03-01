package com.anglll.aflow.ui.discovery;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseFragment;
import com.anglll.aflow.data.model.MultiMedia;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by yuan on 2017/11/30.
 */

public class DiscoveryFragment extends BaseFragment implements DiscoveryContract.View {
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;
    private DiscoveryController controller = new DiscoveryController(null, null);
    private List<MultiMedia> mediaList = new ArrayList<>();
    private DiscoveryContract.Presenter presenter;

    @Nullable
    @Override
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
        mRecyclerView.addItemDecoration(new DiscoveryDecoration(getContext()));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());
        updateController();
        new DiscoveryPresenter(this);
        presenter.getDiscovery();
    }

    private void updateController() {
        controller.setData(mediaList);
    }

    @Override
    public void setPresenter(DiscoveryContract.Presenter presenter) {
        this.presenter = presenter;
    }

    @Override
    public void getDiscovery(List<MultiMedia> mediaList) {
        this.mediaList = mediaList;
        updateController();
    }

    @Override
    public void getDiscoveryFail() {
        TT(R.string.get_discovery_fail);
    }
}
