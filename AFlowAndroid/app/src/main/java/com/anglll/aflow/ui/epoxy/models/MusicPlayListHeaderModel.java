package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.anglll.aflow.ui.music.playlist.detail.DetailController;
import com.facebook.drawee.view.SimpleDraweeView;

import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.model.Song;
import org.lineageos.eleven.utils.MusicUtils;

import butterknife.BindView;
import butterknife.OnClick;

@EpoxyModelClass(layout = R.layout.model_music_playlist_header)
public abstract class MusicPlayListHeaderModel extends EpoxyModelWithHolder<MusicPlayListHeaderModel.ViewHolder> {
    @EpoxyAttribute
    Playlist playlist;
    @EpoxyAttribute
    Song song;
    @EpoxyAttribute
    DetailController.PlayListDetailCallback callback;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.setData(song,playlist);
    }

    class ViewHolder extends BaseEpoxyHolder<Playlist> {
        @BindView(R.id.cover)
        SimpleDraweeView mCover;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;

        @OnClick(R.id.floatingActionButton)
        void playAll() {
            if (callback != null)
                callback.onPlayAll();
        }

        @Override
        protected void bindData(Playlist data) {

        }

        public void setData(Song song, Playlist playlist) {
            // TODO: 2018/6/25  
            if(song!=null)
                mCover.setImageURI(MusicUtils.getAlbumUri(song.mAlbumId));

            if(playlist!=null){
                mTitle.setText(playlist.mPlaylistName);
                String temp = context.getString(R.string.playlist_song_count);
                mSubTitle.setText(String.format(temp, playlist.mSongCount));
            }
        }
    }
}
