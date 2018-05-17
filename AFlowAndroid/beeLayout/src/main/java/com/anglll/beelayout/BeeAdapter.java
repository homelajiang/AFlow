package com.anglll.beelayout;

import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

public abstract class BeeAdapter {
    private List<BeeViewHolder> beeViewHolderList = new ArrayList<>();

    public abstract BeeViewHolder onCreateViewHolder(ViewGroup parent);

    public int getItemCount() {
        return 7;
    }

    public BeeViewHolder getViewHolder(int position) {
        if (position < beeViewHolderList.size() && position >= 0)
            return beeViewHolderList.get(position);
        return null;
    }

    public abstract void onBindViewHolder(BeeViewHolder viewHolder, int position);

    public void setViewHolders(List<BeeViewHolder> viewHolders) {
        this.beeViewHolderList = viewHolders;
    }
}
