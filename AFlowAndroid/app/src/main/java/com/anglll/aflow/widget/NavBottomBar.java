package com.anglll.aflow.widget;

import android.content.Context;
import android.view.LayoutInflater;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.anglll.aflow.R;

public class NavBottomBar extends LinearLayout {
    public NavBottomBar(Context context) {
        super(context);
        setOrientation(HORIZONTAL);
        addViews();
    }

    private void addViews() {

        for (int i = 0; i < 3; i++) {
            addView();
        }

    }

    private void addView() {
        FrameLayout frameLayout = (FrameLayout) LayoutInflater.from(getContext())
                .inflate(R.layout.bottom_bar_item, null);
        frameLayout.getLayoutParams().width = 0;
        frameLayout.getLayoutParams().
        addView(frameLayout);
    }
}
