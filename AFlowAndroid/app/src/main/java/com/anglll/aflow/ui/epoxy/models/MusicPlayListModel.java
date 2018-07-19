package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.anglll.aflow.ui.music.playlist.PlayListController;
import com.facebook.drawee.view.SimpleDraweeView;

import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.utils.BitmapWithColors;

import butterknife.BindView;
import butterknife.OnClick;

@EpoxyModelClass(layout = R.layout.model_music_playlist)
public abstract class MusicPlayListModel extends EpoxyModelWithHolder<MusicPlayListModel.ViewHolder> {
    @EpoxyAttribute
    Playlist playlist;
    @EpoxyAttribute
    PlayListController.MusicPlayListCallback callback;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(playlist);
    }

    @Override
    public int getSpanSize(int totalSpanCount, int position, int itemCount) {
        return totalSpanCount;
    }

    class ViewHolder extends BaseEpoxyHolder<Playlist> {
        @BindView(R.id.bg)
        SimpleDraweeView mBg;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.summary)
        TextView mSummary;

        @OnClick(R.id.card)
        void onItemClick() {
            if (playlist != null && callback != null)
                callback.onPlayListClick(playlist);
        }

        @Override
        protected void bindData(Playlist playlist) {
            mTitle.setText(playlist.mPlaylistName);
            String temp = context.getString(R.string.playlist_song_count);
            mSummary.setText(String.format(temp, playlist.mSongCount));
/*            BitmapWithColors bitmapWithColors =
                    new BitmapWithColors(bitmap, key.hashCode());*/
        }
    }
}
