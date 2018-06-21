package com.anglll.aflow.data.model;

import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.model.Song;

import java.util.List;

public class PlaylistInfo {
    public Playlist playlist;
    public List<Song> songList;

    public PlaylistInfo() {
    }

    public PlaylistInfo(Playlist playlist, List<Song> songList) {
        this.playlist = playlist;
        this.songList = songList;
    }
}
