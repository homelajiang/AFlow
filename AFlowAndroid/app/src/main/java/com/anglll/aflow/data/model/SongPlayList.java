package com.anglll.aflow.data.model;

import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.model.Song;

import java.util.List;

public class SongPlayList {
    public Playlist playlist;
    public List<Song> songList;

    public SongPlayList() {
    }

    public SongPlayList(Playlist playlist, List<Song> songList) {
        this.playlist = playlist;
        this.songList = songList;
    }
}
