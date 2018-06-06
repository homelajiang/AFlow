package com.anglll.aflow.ui.home;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.anglll.aflow.R;
import com.anglll.beelayout.BeeAdapter;
import com.anglll.beelayout.BeeViewHolder;

import org.lineageos.eleven.utils.MusicUtils;

import butterknife.BindView;

public class HomeBeeAdapter extends BeeAdapter<BeeViewHolder> {

    private static final int TYPE_ICON = 0;
    private static final int TYPE_INFO = 1;
    private final Context context;

    public HomeBeeAdapter(Context context) {
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
    public int getItemViewType(int position) {
        if (position == 5)
            return TYPE_INFO;
        return TYPE_ICON;
    }

    public void updateMeta() {
        ((HomeMusicInfoHolder) getViewHolder(5))
                .updateInfo();
    }

    public void updateController() {
        ((HomeBeeViewHolder) getViewHolder(6))
                .updateController();
    }

    class HomeMusicInfoHolder extends BeeViewHolder {
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;

        public HomeMusicInfoHolder(View itemView) {
            super(itemView);
            mTitle = itemView.findViewById(R.id.title);
            mSubTitle = itemView.findViewById(R.id.sub_title);
        }

        public void bindData(final int position) {
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(context,String.valueOf(position),Toast.LENGTH_SHORT).show();
                }
            });
        }

        public void updateInfo() {
            mTitle.setText(MusicUtils.getTrackName());
            mSubTitle.setText(MusicUtils.getArtistName());
        }
    }

    class HomeBeeViewHolder extends BeeViewHolder {
        ImageView mIcon;
        TextView textView;

        public HomeBeeViewHolder(View itemView) {
            super(itemView);
            mIcon = itemView.findViewById(R.id.icon);
            textView = itemView.findViewById(R.id.text);
        }

        public void bindData(final int position) {
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(context,String.valueOf(position),Toast.LENGTH_SHORT).show();
                }
            });
            switch (position) {
                case 0:
                    mIcon.setImageResource(R.drawable.ic_skip_next_black_42dp);
                    break;
                case 1:
                    mIcon.setImageResource(R.drawable.ic_playlist_play_black_36dp);
                    break;
                case 2:
                    mIcon.setImageResource(R.drawable.ic_repeat_one_black_36dp);
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
    }
}

