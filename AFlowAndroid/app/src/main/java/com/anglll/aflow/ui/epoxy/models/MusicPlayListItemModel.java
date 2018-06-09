package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;

import org.lineageos.eleven.model.Song;

import butterknife.BindView;

@EpoxyModelClass(layout = R.layout.model_music_playlist_item)
public abstract class MusicPlayListItemModel extends EpoxyModelWithHolder<MusicPlayListItemModel.ViewHolder> {
    @EpoxyAttribute
    Song song;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(song);
    }

    static class ViewHolder extends BaseEpoxyHolder<Song> {
        @BindView(R.id.index)
        TextView mIndex;
        @BindView(R.id.play_index)
        ImageView mPlayIndex;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;
        @BindView(R.id.more)
        ImageButton mMore;

        @Override
        protected void bindData(Song data) {
            mTitle.setText(data.mSongName);
            mSubTitle.setText(String.valueOf(data.mAlbumName + "-" + data.mArtistName));
        }
    }
}
