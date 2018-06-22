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
import com.anglll.aflow.data.model.SongInfo;
import com.anglll.aflow.ui.music.playlist.detail.DetailController;

import butterknife.BindView;
import butterknife.OnClick;

@EpoxyModelClass(layout = R.layout.model_music_playlist_item)
public abstract class MusicPlayListItemModel extends EpoxyModelWithHolder<MusicPlayListItemModel.ViewHolder> {
    @EpoxyAttribute
    SongInfo song;
    @EpoxyAttribute
    DetailController.PlayListDetailCallback callback;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(song);
    }

    class ViewHolder extends BaseEpoxyHolder<SongInfo> {
        @BindView(R.id.index)
        TextView mIndex;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;
        @BindView(R.id.more)
        ImageButton mMore;

        @OnClick(R.id.item_layout)
        void itemClick() {
            if (callback != null)
                callback.onPlayPlayList(song.index);
        }

        @Override
        protected void bindData(SongInfo data) {
            mTitle.setText(data.mSongName);
            mSubTitle.setText(String.valueOf(data.mAlbumName + "-" + data.mArtistName));
            mIndex.setText(String.valueOf(data.index + 1));
        }
    }
}
