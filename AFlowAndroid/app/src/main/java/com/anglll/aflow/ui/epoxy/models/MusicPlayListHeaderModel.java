package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.widget.ImageView;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;

import org.lineageos.eleven.model.Playlist;

import butterknife.BindView;

@EpoxyModelClass(layout = R.layout.model_music_playlist_header)
public abstract class MusicPlayListHeaderModel extends EpoxyModelWithHolder<MusicPlayListHeaderModel.ViewHolder> {
    @EpoxyAttribute Playlist playlist;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(playlist);
    }

    static class ViewHolder extends BaseEpoxyHolder<Playlist> {
        @BindView(R.id.cover)
        ImageView mCover;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.sub_title)
        TextView mSubTitle;
        @BindView(R.id.play_add)
        TextView mPlayAdd;
        @Override
        protected void bindData(Playlist data) {

        }
    }
}
