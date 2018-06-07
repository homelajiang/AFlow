package com.anglll.aflow.ui.music;

import android.os.Bundle;
import android.support.annotation.Nullable;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;

public class PlayActivity extends BaseMusicActivity{
    //https://blog.csdn.net/lmj623565791/article/details/78011599?utm_source=tuicool&utm_medium=referral
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_play);
    }
}
