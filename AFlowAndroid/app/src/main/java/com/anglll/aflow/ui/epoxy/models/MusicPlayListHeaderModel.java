package com.anglll.aflow.ui.epoxy.models;

import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;

import org.lineageos.eleven.model.Playlist;
@EpoxyModelClass(layout = R.layout.model_music_playlist_header)
public abstract class MusicPlayListHeaderModel extends EpoxyModelWithHolder<MusicPlayListHeaderModel.ViewHolder>{


    static class ViewHolder extends BaseEpoxyHolder<Playlist>{

        @Override
        protected void bindData(Playlist data) {

        }
    }
}
