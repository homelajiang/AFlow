package com.anglll.aflow.ui.home;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseFragment;
import com.anglll.aflow.ui.main.MainActivity;
import com.anglll.aflow.ui.main.MusicStateListener;
import com.anglll.beelayout.BeeLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by yuan on 2017/11/30.
 */

public class HomeFragment extends BaseFragment implements MusicStateListener {

    @BindView(R.id.bee_layout)
    BeeLayout mBeeLayout;
    private HomeBeeAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        ButterKnife.bind(this, view);
        getContainingActivity().setMusicStateListener(this);
        initView();
        getContainingActivity().addMusicStateListener(this);
        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        getContainingActivity().removeMusicStateListener(this);
    }

    private void initView() {
        adapter = new HomeBeeAdapter(getActivity());
        mBeeLayout.setAdapter(adapter);
    }

    public MainActivity getContainingActivity() {
        return (MainActivity) getActivity();
    }

    @Override
    public void restartLoader() {

    }

    @Override
    public void onPlaylistChanged() {

    }

    @Override
    public void onMetaChanged() {
        adapter.updateMeta();
    }

    @Override
    public void onUpdateController() {
        adapter.updateController();
    }
}
