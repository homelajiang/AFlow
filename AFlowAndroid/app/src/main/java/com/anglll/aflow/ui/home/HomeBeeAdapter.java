package com.anglll.aflow.ui.home;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.beelayout.BeeAdapter;
import com.anglll.beelayout.BeeViewHolder;

import butterknife.BindView;
import butterknife.ButterKnife;

public class HomeBeeAdapter extends BeeAdapter<BeeViewHolder> {

    private static final int TYPE_ICON = 0;
    private static final int TYPE_INFO = 1;

    @Override
    public BeeViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == TYPE_INFO) {
            return new HomeBeeViewHolder(LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_home_bee_music_info_item, parent, false));
        }
        return new HomeBeeViewHolder(LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_home_bee_item, parent, false));
    }

    @Override
    public void onBindViewHolder(BeeViewHolder viewHolder, int position) {
        if (viewHolder instanceof HomeMusicInfoHolder) {
            ((HomeMusicInfoHolder) viewHolder).bindData(position);
        } else if (viewHolder instanceof HomeBeeViewHolder) {
            ((HomeBeeViewHolder) viewHolder).bindData(position);
        }
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 6)
            return TYPE_INFO;
        return TYPE_ICON;
    }

    class HomeMusicInfoHolder extends BeeViewHolder {
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;

        public HomeMusicInfoHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }

        public void bindData(int position) {
            mTitle.setText("你好，");
            mSubTitle.setText("世界！");
        }
    }

    class HomeBeeViewHolder extends BeeViewHolder {
        @BindView(R.id.bee_bg)
        ImageView mBeeBg;
        @BindView(R.id.text)
        TextView textView;

        public HomeBeeViewHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }

        public void bindData(int position) {
            textView.setText(String.valueOf(position));
        }
    }
}
