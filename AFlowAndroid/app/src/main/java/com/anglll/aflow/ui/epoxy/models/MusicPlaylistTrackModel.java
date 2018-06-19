package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;

import org.lineageos.eleven.model.Song;

@EpoxyModelClass(layout = R.layout.model_music_playlist_track)
public abstract class MusicPlaylistTrackModel  extends EpoxyModelWithHolder<MusicPlaylistTrackModel.ViewHolder>{

//    @EpoxyAttribute

    @Override
    public void bind(@NonNull ViewHolder holder) {
//        holder.bindData();
    }

    @Override
    public int getSpanSize(int totalSpanCount, int position, int itemCount) {
        return totalSpanCount;
    }

    class ViewHolder extends BaseEpoxyHolder<Song>{

        @Override
        protected void bindData(Song data) {

        }
    }
}
