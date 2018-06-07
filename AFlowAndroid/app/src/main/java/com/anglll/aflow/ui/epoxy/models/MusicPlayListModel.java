package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.support.v7.widget.AppCompatImageButton;
import android.support.v7.widget.CardView;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.facebook.drawee.view.SimpleDraweeView;

import org.lineageos.eleven.model.Playlist;

import butterknife.BindView;

@EpoxyModelClass(layout = R.layout.model_music_playlist)
public abstract class MusicPlayListModel extends EpoxyModelWithHolder<MusicPlayListModel.ViewHolder> {
    @EpoxyAttribute
    Playlist playlist;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(playlist);
    }

    @Override
    public int getSpanSize(int totalSpanCount, int position, int itemCount) {
        return totalSpanCount;
    }

    static class ViewHolder extends BaseEpoxyHolder<Playlist> {
        @BindView(R.id.play_playlist)
        AppCompatImageButton mPlayPlaylist;
        @BindView(R.id.card_bg)
        SimpleDraweeView mCardBg;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.des)
        TextView mDes;
        @BindView(R.id.card)
        CardView mCard;

        @Override
        protected void bindData(Playlist playlist) {
            mTitle.setText(playlist.mPlaylistName);
            String temp = context.getString(R.string.playlist_song_count);
            mDes.setText(String.format(temp,playlist.mSongCount));
        }
    }
}
