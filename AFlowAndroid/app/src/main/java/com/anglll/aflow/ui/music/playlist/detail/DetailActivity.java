package com.anglll.aflow.ui.music.playlist.detail;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.Loader;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;
import com.anglll.aflow.data.model.SongPlayList;
import com.anglll.aflow.utils.Router;

import org.lineageos.eleven.Config;
import org.lineageos.eleven.loaders.LastAddedLoader;
import org.lineageos.eleven.loaders.PlaylistSongLoader;
import org.lineageos.eleven.loaders.TopTracksLoader;
import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.model.Song;
import org.lineageos.eleven.sectionadapter.SectionCreator;
import org.lineageos.eleven.sectionadapter.SectionListContainer;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class DetailActivity extends BaseMusicActivity implements DetailController.PlayListDetailCallback {
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;
    SongPlayList songPlayList = new SongPlayList();

    private DetailController controller = new DetailController(this, null);

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_playlist_detail);
        ButterKnife.bind(this);
        initView();
        initData();
    }

    private void initData() {
        if (getIntent() == null) {
            finish();
            return;
        }
        songPlayList.playlist = new Playlist(
                getIntent().getLongExtra(Router.PLAYLIST_ID, 0),
                getIntent().getStringExtra(Router.PLAYLIST_NAME),
                getIntent().getIntExtra(Router.PLAYLIST_COUNT, 0)
        );
        if (songPlayList.playlist.mPlaylistId == 0) {
            finish();
            return;
        }
        updateController();
        Config.SmartPlaylistType type = Config.SmartPlaylistType.getTypeById(songPlayList.playlist.mPlaylistId);
        if (type != null) {
            initLoader(0, null, new DefaultPlayListCallback(type));
        } else {
            initLoader(0, null, new UserPlayListCallback());
        }
    }

    private void initView() {
        controller.setSpanCount(1);
        GridLayoutManager manager = new GridLayoutManager(getContext(), 1);
        manager.setSpanSizeLookup(controller.getSpanSizeLookup());
        mRecyclerView.setLayoutManager(manager);
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());
    }

    private void updateController() {
        controller.setData(songPlayList);
    }

    @Override
    public void onPlayPlayList(int index) {
        playPlaylist(songPlayList.playlist, index);
    }

    @Override
    public void onPlayAll() {
        playPlaylist(songPlayList.playlist,0);
    }

    class UserPlayListCallback implements LoaderManager.LoaderCallbacks<List<Song>> {

        @NonNull
        @Override
        public Loader<List<Song>> onCreateLoader(int id, @Nullable Bundle args) {
            return new PlaylistSongLoader(getContext(), songPlayList.playlist.mPlaylistId);
        }

        @Override
        public void onLoadFinished(@NonNull Loader<List<Song>> loader, List<Song> data) {
            songPlayList.songList = data;
            updateController();
        }

        @Override
        public void onLoaderReset(@NonNull Loader<List<Song>> loader) {

        }
    }

    class DefaultPlayListCallback implements LoaderManager.LoaderCallbacks<SectionListContainer<Song>> {

        private final Config.SmartPlaylistType type;

        public DefaultPlayListCallback(Config.SmartPlaylistType type) {
            this.type = type;
        }

        @NonNull
        @Override
        public Loader<SectionListContainer<Song>> onCreateLoader(int id, @Nullable Bundle args) {
            switch (type) {
                case LastAdded: {
                    LastAddedLoader loader = new LastAddedLoader(DetailActivity.this);
                    return new SectionCreator<Song>(getContext(), loader, null);
                }
                case RecentlyPlayed: {
                    TopTracksLoader loader = new TopTracksLoader(getContext(),
                            TopTracksLoader.QueryType.RecentSongs);
                    return new SectionCreator<Song>(getContext(), loader, null);
                }
                case TopTracks: {
                    TopTracksLoader loader = new TopTracksLoader(getContext(),
                            TopTracksLoader.QueryType.TopTracks);
                    return new SectionCreator<Song>(getContext(), loader, null);
                }
                default:
                    return null;
            }
        }

        @Override
        public void onLoadFinished(@NonNull Loader<SectionListContainer<Song>> loader, SectionListContainer<Song> data) {
            songPlayList.songList = data.mListResults;
            updateController();
        }

        @Override
        public void onLoaderReset(@NonNull Loader<SectionListContainer<Song>> loader) {

        }
    }
}
