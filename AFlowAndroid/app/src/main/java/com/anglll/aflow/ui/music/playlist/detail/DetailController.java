package com.anglll.aflow.ui.music.playlist.detail;

import android.support.v7.widget.RecyclerView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.data.model.SongPlayList;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListHeaderModel_;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListItemModel_;

import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.model.Song;

import java.util.List;

public class DetailController extends TypedEpoxyController<SongPlayList> {
    private PlayListDetailCallback callback;
    private RecyclerView.RecycledViewPool recycledViewPool;

    DetailController(PlayListDetailCallback callback, RecyclerView.RecycledViewPool recycledViewPool) {
        this.callback = callback;
        this.recycledViewPool = recycledViewPool;
    }

    @Override
    protected void buildModels(SongPlayList data) {
        if (data == null)
            return;
        if (data.playlist != null) {
            if (data.songList != null && !data.songList.isEmpty()) {
                add(new MusicPlayListHeaderModel_()
                        .id(data.playlist.mPlaylistId)
                        .song(data.songList.get(0))
                        .callback(callback)
                        .playlist(data.playlist));
            } else {
                add(new MusicPlayListHeaderModel_()
                        .id(data.playlist.mPlaylistId)
                        .callback(callback)
                        .playlist(data.playlist));
            }

        }

        if (data.songList != null)
            for (int i = 0; i < data.songList.size(); i++) {
                add(new MusicPlayListItemModel_()
                        .index(i)
                        .callback(callback)
                        .id(data.songList.get(i).hashCode())
                        .song(data.songList.get(i)));
            }
    }


    public interface PlayListDetailCallback {
        void onPlayPlayList(int index);

        void onPlayAll();
    }
}
