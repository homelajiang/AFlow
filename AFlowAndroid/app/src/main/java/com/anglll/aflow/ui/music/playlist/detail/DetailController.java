package com.anglll.aflow.ui.music.playlist.detail;

import android.support.v7.widget.RecyclerView;

import com.airbnb.epoxy.AutoModel;
import com.airbnb.epoxy.EpoxyController;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListHeaderModel_;
import com.anglll.aflow.ui.epoxy.models.MusicPlayListItemModel_;

import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.model.Song;
import org.lineageos.eleven.utils.MusicUtils;

import java.util.Collections;
import java.util.List;

public class DetailController extends EpoxyController {
    private PlayListDetailCallback callback;
    private RecyclerView.RecycledViewPool recycledViewPool;

    public Playlist playlist;
    public List<Song> songList = Collections.emptyList();
    public Song firstSong = null;
    @AutoModel
    MusicPlayListHeaderModel_ mHeader;

    DetailController(PlayListDetailCallback callback, RecyclerView.RecycledViewPool recycledViewPool) {
        this.callback = callback;
        this.recycledViewPool = recycledViewPool;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
        requestModelBuild();
    }

    public void setSongList(List<Song> songList) {
        this.songList = songList;
        if (!songList.isEmpty())
            firstSong = songList.get(0);
        requestModelBuild();
    }

    @Override
    protected void buildModels() {

        mHeader
                .id(playlist.mPlaylistId)
                .song(firstSong)
                .callback(callback)
                .playlist(playlist)
                .addTo(this);

        int playingIndex = MusicUtils.getQueuePosition();
        for (int i = 0; i < songList.size(); i++) {
            add(new MusicPlayListItemModel_()
                    .callback(callback)
                    .id(i)
                    .index(i)
                    .playing(playingIndex == i)
                    .song(songList.get(i)));
        }


    }


    public interface PlayListDetailCallback {
        void onPlayPlayList(int index);

        void onPlayAll();
    }
}
