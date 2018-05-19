package com.anglll.aflow.ui.home;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.anglll.aflow.R;
import com.anglll.beelayout.BeeAdapter;
import com.anglll.beelayout.BeeViewHolder;

import butterknife.BindView;
import butterknife.ButterKnife;

public class HomeBeeAdapter extends BeeAdapter {

    @Override
    public BeeViewHolder onCreateViewHolder(ViewGroup parent) {
        return new HomeBeeViewHolder(LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_home_bee_item, parent, false));
    }

    @Override
    public void onBindViewHolder(BeeViewHolder viewHolder, int position) {
    }

    class HomeBeeViewHolder extends BeeViewHolder {
        @BindView(R.id.bee_bg)
        ImageView mBeeBg;

        public HomeBeeViewHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }

        public void bindData() {

        }
    }
}
