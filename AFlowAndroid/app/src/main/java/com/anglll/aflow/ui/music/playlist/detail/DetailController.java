package com.anglll.aflow.ui.music.playlist.detail;

import android.support.v7.widget.RecyclerView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListHeaderModel_;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListItemModel_;

import org.lineageos.eleven.model.Song;

import java.util.List;

public class DetailController extends TypedEpoxyController<List<Song>> {
    private PlayListDetailCallback callback;
    private RecyclerView.RecycledViewPool recycledViewPool;

    DetailController(PlayListDetailCallback callback, RecyclerView.RecycledViewPool recycledViewPool) {
        this.callback = callback;
        this.recycledViewPool = recycledViewPool;
    }

    @Override
    protected void buildModels(List<Song> data) {
        add(new MusicPlayListHeaderModel_()
                .id(1111111));
        for (Song song : data) {
            add(new MusicPlayListItemModel_()
                    .id(song.hashCode())
                    .song(song));
        }
    }


    public interface PlayListDetailCallback {
    }
}
