package com.anglll.aflow.ui.main;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.view.ViewPager;
import android.view.MenuItem;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;
import com.anglll.aflow.ui.discovery.DiscoveryFragment;
import com.anglll.aflow.ui.home.HomeFragment;
import com.anglll.aflow.ui.user.UserFragment;

import java.util.ArrayList;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class MainActivity extends BaseMusicActivity implements
        BottomNavigationView.OnNavigationItemSelectedListener {

    @BindView(R.id.title)
    TextView mTitle;
    @BindView(R.id.navigation)
    BottomNavigationView mNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
        initView();
    }
//https://github.com/gpfduoduo/android-article/blob/master/Activity%20%2B%20%E5%A4%9AFrament%20%E4%BD%BF%E7%94%A8%E6%97%B6%E7%9A%84%E4%B8%80%E4%BA%9B%E5%9D%91.md
    private void initView() {
//        navigation.setSelectedItemId(navigation.getMenu().getItem(position).getItemId());
        mNavigation.setOnNavigationItemSelectedListener(this);
        HomeFragment homeFragment = new HomeFragment();
        DiscoveryFragment discoveryFragment = new DiscoveryFragment();
        UserFragment userFragment = new UserFragment();

        getSupportFragmentManager().beginTransaction()
                .add(R.id.container,homeFragment,"home")
        .commit();
        getSupportFragmentManager().beginTransaction()
                .add(R.id.container,discoveryFragment,"discovery")
                .commit();
        getSupportFragmentManager().beginTransaction()
                .add(R.id.container,userFragment,"user")
                .commit();
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        resetDefaultIcon();
        switch (item.getItemId()) {
            case R.id.navigation_home:
                item.setIcon(R.drawable.ic_home_selected);
                return true;
            case R.id.navigation_discovery:
                item.setIcon(R.drawable.ic_discovery_selected);
                return true;
            case R.id.navigation_mine:
                item.setIcon(R.drawable.ic_mine_selected);
                return true;
        }
        return false;
    }

    private void resetDefaultIcon() {
        mNavigation.getMenu()
                .findItem(R.id.navigation_home)
                .setIcon(R.drawable.ic_home);
        mNavigation.getMenu()
                .findItem(R.id.navigation_discovery)
                .setIcon(R.drawable.ic_discovery);
        mNavigation.getMenu()
                .findItem(R.id.navigation_mine)
                .setIcon(R.drawable.ic_mine);

    }
}
