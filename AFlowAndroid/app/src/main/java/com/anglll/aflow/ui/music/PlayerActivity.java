package com.anglll.aflow.ui.music;

import android.content.ComponentName;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v7.widget.AppCompatImageButton;
import android.support.v7.widget.AppCompatImageView;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;

import org.lineageos.eleven.MusicPlaybackService;
import org.lineageos.eleven.utils.MusicUtils;

import java.lang.ref.WeakReference;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class PlayerActivity extends BaseMusicActivity implements
        SeekBar.OnSeekBarChangeListener {
    private static final String TAG = "Player activity";
    private static final int SEEKBAR_MAX_PROGRESS = 1000;
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

    // Message to refresh the time
    private static final int REFRESH_TIME = 1;

    /**
     * seekbar is dragging
     */
    private boolean isDragging;
    private TimeHandler mTimeHandler;
    /**
     * is pause
     */
    private boolean mIsPaused;

    //https://blog.csdn.net/lmj623565791/article/details/78011599?utm_source=tuicool&utm_medium=referral
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_play);
        ButterKnife.bind(this);
        initView();
        initData();
    }

    private void initData() {
        mTimeHandler = new TimeHandler(this);
    }


    private void initView() {
        mSubTitle.setVisibility(View.VISIBLE);
        mSeekBar.setMax(SEEKBAR_MAX_PROGRESS);
        mSeekBar.setOnSeekBarChangeListener(this);
    }

    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        super.onServiceConnected(name, service);
        queueNextRefresh(1);
        updateMeta();
        updateController();
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
    }

    private long refreshCurrentTime() {
        if (mService == null)
            return MusicUtils.UPDATE_FREQUENCY_MS;
        try {
            final long pos = MusicUtils.position();
            if (pos >= 0 && MusicUtils.duration() > 0) {
                refreshCurrentTimeText(pos);
                if (isDragging) {
                    return MusicUtils.UPDATE_FREQUENCY_FAST_MS;
                } else if (MusicUtils.isPlaying()) {
                    return Math.max(20, 1000 - pos % 1000);
                } else {
                    // blink the counter
                }
            } else {
                mCurrentTime.setText("--:--");
            }

        } catch (Exception ignored) {
            if (ignored.getMessage() != null) {
                Log.e(TAG, ignored.getMessage());
            }
        }
        return MusicUtils.UPDATE_FREQUENCY_MS;
    }

    private void refreshCurrentTimeText(long pos) {
        if (isDragging) {
            pos = MusicUtils.duration() * mSeekBar.getProgress() / SEEKBAR_MAX_PROGRESS;
        } else {
            mSeekBar.setProgress((int) (pos * SEEKBAR_MAX_PROGRESS / MusicUtils.duration()));
        }
        mCurrentTime.setText(MusicUtils.makeShortTimeString(getContext(), pos / 1000));
    }

    private void queueNextRefresh(final long delay) {
        if (!mIsPaused) {
            final Message message = mTimeHandler.obtainMessage(REFRESH_TIME);
            mTimeHandler.removeMessages(REFRESH_TIME);
            mTimeHandler.sendMessageDelayed(message, delay);
        }
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
        String totalTime = MusicUtils.makeShortTimeString(this, MusicUtils.duration() / 1000);
        if (!mTotalTime.getText().toString().equals(totalTime))
            mTotalTime.setText(totalTime);

        mTitle.setText(MusicUtils.getTrackName());
        mSubTitle.setText(MusicUtils.getArtistName());
        updateRepeatAndShuffleStatus();
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

    @Override
    protected void onStart() {
        super.onStart();
        final long next = refreshCurrentTime();
        queueNextRefresh(next);
    }

    @Override
    protected void onDestroy() {
        mIsPaused = false;
        mTimeHandler.removeMessages(REFRESH_TIME);
        super.onDestroy();
    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {

    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        isDragging = true;
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        isDragging = false;
        MusicUtils.seek(MusicUtils.duration() * seekBar.getProgress() / SEEKBAR_MAX_PROGRESS);
    }

    private static final class TimeHandler extends Handler {
        private final WeakReference<PlayerActivity> mAudioPlayer;

        public TimeHandler(final PlayerActivity activity) {
            mAudioPlayer = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case REFRESH_TIME:
                    final long next = mAudioPlayer.get().refreshCurrentTime();
                    mAudioPlayer.get().queueNextRefresh(next);
                    break;
                default:
                    break;
            }
        }
    }
}
