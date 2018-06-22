package com.anglll.aflow.ui.home;

import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.aflow.ui.dialog.NowPlayingDialog;
import com.anglll.aflow.ui.music.PlayerActivity;
import com.anglll.aflow.ui.music.playlist.PlayListActivity;
import com.anglll.beelayout.BeeAdapter;
import com.anglll.beelayout.BeeViewHolder;
import com.facebook.drawee.view.SimpleDraweeView;

import org.lineageos.eleven.MusicPlaybackService;
import org.lineageos.eleven.utils.MusicUtils;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class HomeBeeAdapter extends BeeAdapter<BeeViewHolder> {

    private static final int TYPE_ICON = 0;
    private static final int TYPE_INFO = 1;
    private final FragmentActivity context;

    public HomeBeeAdapter(FragmentActivity context) {
        this.context = context;
    }

    @Override
    public BeeViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == TYPE_INFO) {
            return new HomeMusicInfoHolder(LayoutInflater.from(parent.getContext())
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
    public void notifyItemChanged(int position) {
        BeeViewHolder viewHolder = getViewHolder(position);
        if (viewHolder == null)
            return;
        switch (position) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                ((HomeBeeViewHolder) viewHolder).updateRepeatAndShuffleStatus();
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                ((HomeMusicInfoHolder) viewHolder).updateInfo();
                break;
            case 6:
                ((HomeBeeViewHolder) viewHolder).updateController();
                break;
            default:
        }
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 5)
            return TYPE_INFO;
        return TYPE_ICON;
    }

    public void updateMeta() {
        notifyItemChanged(5);
        notifyItemChanged(2);

    }

    public void updateController() {
        notifyItemChanged(6);
    }

    class HomeMusicInfoHolder extends BeeViewHolder {
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;
        @BindView(R.id.simpleDraweeView)
        SimpleDraweeView simpleDraweeView;

        private int position = -1;

        @OnClick(R.id.item_layout)
        void onItemLayoutClick() {
            if (position == 5) {
                context.startActivity(new Intent(context, PlayerActivity.class));
            }
        }

        public HomeMusicInfoHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }

        public void bindData(final int position) {
            this.position = position;
        }

        public void updateInfo() {
            itemView.post(new Runnable() {
                @Override
                public void run() {
                    Log.d("update_info","update");
                    mTitle.setText(MusicUtils.getTrackName());
                    mSubTitle.setText(MusicUtils.getArtistName());
                    simpleDraweeView.setImageURI(MusicUtils.getAlbumUri(MusicUtils.getCurrentAlbumId()));
                }
            });
        }
    }

    class HomeBeeViewHolder extends BeeViewHolder {
        @BindView(R.id.icon)
        ImageView mIcon;
        @BindView(R.id.text)
        TextView textView;
        private int position = -1;

        @OnClick(R.id.item_layout)
        void onItemLayoutClick() {
            switch (position) {
                case 0:// play next
                    MusicUtils.next();
                    break;
                case 1:
                    new NowPlayingDialog().show(context.getSupportFragmentManager(), "NOW_PLAYING_DIALOG");
                    break;
                case 2:
                    MusicUtils.cycleRepeatAndShuffle();
                    updateRepeatAndShuffleStatus();
                    break;
                case 3:
                    MusicUtils.previous(context, false);
                    break;
                case 4:
                    context.startActivity(new Intent(context, PlayListActivity.class));
                    break;
                case 6:
                    MusicUtils.playOrPause();
                    break;
            }
        }

        public HomeBeeViewHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }

        public void bindData(final int position) {
            this.position = position;
            switch (position) {
                case 0:
                    mIcon.setImageResource(R.drawable.ic_skip_next_black_42dp);
                    break;
                case 1:
                    mIcon.setImageResource(R.drawable.ic_playlist_play_black_36dp);
                    break;
                case 2:
                    updateRepeatAndShuffleStatus();
                    break;
                case 3:
                    mIcon.setImageResource(R.drawable.ic_skip_previous_black_42dp);
                    break;
                case 4:
                    mIcon.setImageResource(R.drawable.ic_queue_music_black_36dp);
                    break;
                case 6:
                    mIcon.setImageResource(R.drawable.ic_play_arrow_black_56dp);
                    break;
                default:
            }
        }


        public void updateController() {
            if (MusicUtils.isPlaying()) {
                mIcon.setContentDescription(context.getString(R.string.accessibility_pause));
                mIcon.setImageResource(R.drawable.ic_pause_black_56dp);
            } else {
                mIcon.setContentDescription(context.getString(R.string.accessibility_play));
                mIcon.setImageResource(R.drawable.ic_play_arrow_black_56dp);
            }
        }

        public void updateRepeatAndShuffleStatus() {
            switch (MusicUtils.getRepeatAndShuffleModel()) {
                case MusicPlaybackService.REPEAT_NONE:
                    mIcon.setImageResource(R.drawable.ic_shuffle_black_36dp);
                    break;
                case MusicPlaybackService.REPEAT_CURRENT:
                    mIcon.setImageResource(R.drawable.ic_repeat_one_black_36dp);
                    break;
                case MusicPlaybackService.REPEAT_ALL:
                    mIcon.setImageResource(R.drawable.ic_repeat_black_36dp);
                    break;
                default:
                    break;
            }
        }
    }
}

