package com.anglll.aflow.ui.main;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.AppCompatImageButton;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;
import com.anglll.aflow.ui.discovery.DiscoveryFragment;
import com.anglll.aflow.ui.home.HomeFragment;
import com.anglll.aflow.ui.user.UserFragment;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.BindViews;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class MainActivity extends BaseMusicActivity {

    @BindView(R.id.title_left)
    AppCompatImageButton titleLeft;
    @BindView(R.id.title)
    TextView title;
    @BindView(R.id.title_right)
    AppCompatImageButton titleRight;
    @BindView(R.id.view_pager)
    ViewPager viewPager;
    private int[] titleRes = {R.string.title_home, R.string.title_discovery, R.string.profile};
    private int[] unSelectedRes = {R.drawable.ic_home, R.drawable.ic_discover, R.drawable.ic_discover};
    private int[] selectedRes = {R.drawable.ic_home_selected, R.drawable.ic_discover_selected, R.drawable.ic_discover_selected};
    @BindViews({R.id.home, R.id.discovery, R.id.user})
    List<ImageView> imageViews;
    @BindView(R.id.root)
    LinearLayout mLinearLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
//        StatusBarUtil.setColor(this, ContextCompat.getColor(getContext(), R.color.white));
        selectNavBar(0);
        initView();
    }

    private void initView() {
        List<Fragment> fragments = new ArrayList<>();
        fragments.add(new HomeFragment());
        fragments.add(new DiscoveryFragment());
        fragments.add(new UserFragment());
        MainPagerAdapter pagerAdapter
                = new MainPagerAdapter(getSupportFragmentManager(), fragments);
        viewPager.setAdapter(pagerAdapter);
        viewPager.setCurrentItem(1);
        selectNavBar(1);
        viewPager.setOffscreenPageLimit(fragments.size() - 1);
        viewPager.addOnPageChangeListener(simpleOnPageChangeListener);
    }

    @OnClick({R.id.home_layout, R.id.discovery_layout,R.id.user_layout})
    void onNavBarClick(View view) {
        int position = 0;
        switch (view.getId()) {
            case R.id.home_layout:
                position = 0;
                break;
            case R.id.discovery_layout:
                position = 1;
                break;
            case R.id.user_layout:
                position = 2;
                break;
        }
        selectNavBar(position);
    }

    private void selectNavBar(int position) {
        for (int i = 0; i < imageViews.size(); i++) {
            title.setText(getString(titleRes[position]));
            if (position == i) {
                imageViews.get(i).setImageResource(selectedRes[i]);
            } else {
                imageViews.get(i).setImageResource(unSelectedRes[i]);
            }
        }
        viewPager.setCurrentItem(position);
    }

    private ViewPager.SimpleOnPageChangeListener simpleOnPageChangeListener
            = new ViewPager.SimpleOnPageChangeListener() {
        @Override
        public void onPageSelected(int position) {
            selectNavBar(position);
        }
    };
}
