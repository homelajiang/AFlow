package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.anglll.aflow.ui.imp.PlayListDetailCallback;

import org.lineageos.eleven.model.Song;

import butterknife.BindView;
import butterknife.OnClick;

@EpoxyModelClass(layout = R.layout.model_music_playlist_item)
public abstract class MusicPlayListItemModel extends EpoxyModelWithHolder<MusicPlayListItemModel.ViewHolder> {
    @EpoxyAttribute
    Song song;
    @EpoxyAttribute
    int index;
    @EpoxyAttribute
    boolean playing;

    @EpoxyAttribute
    PlayListDetailCallback callback;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.setData(song, index, playing);
    }

    class ViewHolder extends BaseEpoxyHolder<Song> {
        @BindView(R.id.index)
        TextView mIndex;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;
        @BindView(R.id.more)
        ImageButton mMore;
        @BindView(R.id.speaker)
        ImageView mSpeaker;
        private int index;

        @OnClick(R.id.item_layout)
        void itemClick() {
            if (callback != null)
                callback.onPlayPlayList(index);
        }

        @OnClick(R.id.more)
        void showMenus() {
            if (callback != null)
                callback.onShowMenu(index);
        }

        @Override
        protected void bindData(Song data) {

        }

        public void setData(Song song, int index, boolean playing) {
            this.index = index;
            mTitle.setText(song.mSongName);
            mSubTitle.setText(String.valueOf(song.mAlbumName + "-" + song.mArtistName));
            mIndex.setText(String.valueOf(index + 1));

            if (playing) {
                mSpeaker.setVisibility(View.VISIBLE);
                mIndex.setVisibility(View.INVISIBLE);
            } else {
                mSpeaker.setVisibility(View.GONE);
                mIndex.setVisibility(View.VISIBLE);
            }
        }
    }
}
