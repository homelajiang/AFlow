package com.anglll.aflow.ui.music;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.AppCompatImageButton;
import android.support.v7.widget.AppCompatImageView;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;

import org.lineageos.eleven.MusicPlaybackService;
import org.lineageos.eleven.utils.MusicUtils;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class PlayerActivity extends BaseMusicActivity {
    @BindView(R.id.title_left)
    AppCompatImageButton mTitleLeft;
    @BindView(R.id.title)
    TextView mTitle;
    @BindView(R.id.title_right)
    AppCompatImageButton mTitleRight;
    @BindView(R.id.cover)
    AppCompatImageView mCover;
    @BindView(R.id.play_pre)
    AppCompatImageButton mPlayPre;
    @BindView(R.id.play_or_pause)
    AppCompatImageButton mPlayOrPause;
    @BindView(R.id.play_next)
    AppCompatImageButton mPlayNext;
    @BindView(R.id.control_layout)
    LinearLayout mControlLayout;
    @BindView(R.id.current_time)
    TextView mCurrentTime;
    @BindView(R.id.seekBar)
    SeekBar mSeekBar;
    @BindView(R.id.total_time)
    TextView mTotalTime;
    @BindView(R.id.seekBar_layout)
    LinearLayout mSeekBarLayout;
    @BindView(R.id.track_list)
    AppCompatImageButton mTrackList;
    @BindView(R.id.add_to_playlist)
    AppCompatImageButton mAddToPlaylist;
    @BindView(R.id.play_mode)
    AppCompatImageButton mPlayMode;
    @BindView(R.id.share)
    AppCompatImageButton mShare;
    @BindView(R.id.more)
    AppCompatImageButton mMore;
    @BindView(R.id.sub_title)
    TextView mSubTitle;

    //https://blog.csdn.net/lmj623565791/article/details/78011599?utm_source=tuicool&utm_medium=referral
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_play);
        ButterKnife.bind(this);
        initView();
    }

    private void initView() {
        mSubTitle.setVisibility(View.VISIBLE);
    }

    @Override
    public void restartLoader() {
        super.restartLoader();
    }

    @Override
    public void onPlaylistChanged() {
        super.onPlaylistChanged();
    }

    @Override
    public void onUpdateController() {
        super.onUpdateController();
        updateController();
    }

    @Override
    public void cacheUnpaused() {
        super.cacheUnpaused();
    }

    @Override
    public void onMetaChanged() {
        super.onMetaChanged();
        updateMeta();
        updateRepeatAndShuffleStatus();
    }

    private void updateController() {
        if (MusicUtils.isPlaying()) {
            mPlayOrPause.setContentDescription(getString(R.string.accessibility_pause));
            mPlayOrPause.setImageResource(R.drawable.ic_pause_black_56dp);
        } else {
            mPlayOrPause.setContentDescription(getString(R.string.accessibility_play));
            mPlayOrPause.setImageResource(R.drawable.ic_play_arrow_black_56dp);
        }
    }

    private void updateMeta() {
        mTitle.setText(MusicUtils.getTrackName());
        mSubTitle.setText(MusicUtils.getArtistName());
    }

    private void updateRepeatAndShuffleStatus() {
        switch (MusicUtils.getRepeatAndShuffleModel()) {
            case MusicPlaybackService.REPEAT_NONE:
                mPlayMode.setImageResource(R.drawable.ic_shuffle_black_36dp);
                break;
            case MusicPlaybackService.REPEAT_CURRENT:
                mPlayMode.setImageResource(R.drawable.ic_repeat_one_black_36dp);
                break;
            case MusicPlaybackService.REPEAT_ALL:
                mPlayMode.setImageResource(R.drawable.ic_repeat_black_36dp);
                break;
            default:
                break;
        }
    }

    @OnClick({R.id.play_pre, R.id.play_or_pause, R.id.play_next, R.id.track_list, R.id.add_to_playlist, R.id.play_mode, R.id.share, R.id.more})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.play_pre:
                MusicUtils.previous(this, false);
                break;
            case R.id.play_or_pause:
                MusicUtils.playOrPause();
                break;
            case R.id.play_next:
                MusicUtils.next();
                break;
            case R.id.track_list:
                break;
            case R.id.add_to_playlist:
                break;
            case R.id.play_mode:
                MusicUtils.cycleRepeatAndShuffle();
                updateRepeatAndShuffleStatus();
                break;
            case R.id.share:
                break;
            case R.id.more:
                break;
        }
    }
}
