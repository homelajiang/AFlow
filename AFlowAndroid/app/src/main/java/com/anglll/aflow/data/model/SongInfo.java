package com.anglll.aflow.data.model;

import org.lineageos.eleven.model.Song;

public class SongInfo extends Song {
    //the index of the song in playlist
    public int index = -1;

    /**
     * Constructor of <code>Song</code>
     *
     * @param songId     The Id of the song
     * @param songName   The name of the song
     * @param artistName The song artist
     * @param albumName  The song album
     * @param albumId
     * @param duration   The duration of a song in seconds
     * @param year       The year the song was recorded
     */
    public SongInfo(long songId, String songName, String artistName, String albumName, long albumId, int duration, int year) {
        super(songId, songName, artistName, albumName, albumId, duration, year);
    }

    public SongInfo(Song song, int index) {
        super(song.mSongId, song.mSongName, song.mArtistName, song.mAlbumName, song.mAlbumId, song.mDuration, song.mYear);
        this.index = index;
    }
}
