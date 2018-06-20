package com.anglll.aflow.ui.music.playlist;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.Loader;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;
import com.anglll.aflow.utils.Router;

import org.lineageos.eleven.Config;
import org.lineageos.eleven.loaders.PlaylistLoader;
import org.lineageos.eleven.model.Playlist;
import org.lineageos.eleven.utils.MusicUtils;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PlayListActivity extends BaseMusicActivity implements
        LoaderManager.LoaderCallbacks<List<Playlist>>, PlayListController.MusicPlayListCallback {
    @BindView(R.id.toolBar)
    Toolbar mToolBar;
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;

    private PlayListController controller = new PlayListController(this, null);
    private List<Playlist> playLists;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_playlist);
        ButterKnife.bind(this);
        initView();
    }

    private void initView() {
        setSupportActionBar(mToolBar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle("播放列表");
        getSupportActionBar().setSubtitle("cacagaf");
        controller.setSpanCount(1);
        GridLayoutManager manager = new GridLayoutManager(getContext(), 1);
        manager.setSpanSizeLookup(controller.getSpanSizeLookup());
        mRecyclerView.setLayoutManager(manager);
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());

        initLoader(2, null, this);
    }

    private void updateController() {
        controller.setData(playLists);
    }

    @NonNull
    @Override
    public Loader<List<Playlist>> onCreateLoader(int id, @Nullable Bundle args) {
        return new PlaylistLoader(this);
    }

    @Override
    public void onLoadFinished(@NonNull Loader<List<Playlist>> loader, List<Playlist> data) {
        this.playLists = data;
        updateController();
    }

    @Override
    public void onLoaderReset(@NonNull Loader<List<Playlist>> loader) {

    }

    @Override
    public void onPlayListClick(Playlist playlist) {
        Router.openPlayList(this, playlist);
    }

    @Override
    public void onPlayPlayList(Playlist playlist) {
        MusicUtils.playAll(getContext(), getIdList(playlist), 0,
                playlist.mPlaylistId, Config.IdType.Playlist, false);
    }

    public long[] getIdList(Playlist playlist) {
        if (playlist.isSmartPlaylist()) {
            return MusicUtils.getSongListForSmartPlaylist(getContext(),
                    Config.SmartPlaylistType.getTypeById(playlist.mPlaylistId));
        } else {
            return MusicUtils.getSongListForPlaylist(getContext(),
                    playlist.mPlaylistId);
        }
    }

}
