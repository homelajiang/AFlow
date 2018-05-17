package com.anglll.aflow.ui.home;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseFragment;
import com.anglll.beelayout.BeeLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by yuan on 2017/11/30.
 */

public class HomeFragment extends BaseFragment {

    @BindView(R.id.bee_layout)
    BeeLayout mBeeLayout;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        ButterKnife.bind(this, view);
        return view;
    }

}
