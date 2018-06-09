package com.anglll.aflow.ui.music.playlist;

import android.support.v7.widget.RecyclerView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListModel_;

import org.lineageos.eleven.model.Playlist;

import java.util.List;

public class PlayListController extends TypedEpoxyController<List<Playlist>> {
    private MusicPlayListCallback callback;
    private RecyclerView.RecycledViewPool recyclerViewPool;

    PlayListController(MusicPlayListCallback callback, RecyclerView.RecycledViewPool recycledViewPool) {
        this.callback = callback;
        this.recyclerViewPool = recycledViewPool;
    }

    @Override
    protected void buildModels(List<Playlist> data) {
        for (Playlist playlist : data) {
            add(new MusicPlayListModel_()
                    .id(playlist.mPlaylistId)
                    .callback(callback)
                    .playlist(playlist));
        }
    }

    public interface MusicPlayListCallback {
        void onPlayListClick(Playlist playlist);

        void onPlayPlayList(Playlist playlist);
    }
}
