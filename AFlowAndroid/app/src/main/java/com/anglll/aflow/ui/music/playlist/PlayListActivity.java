package com.anglll.aflow.ui.music.playlist;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.Loader;
import android.support.v7.widget.AppCompatImageButton;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.TextView;

import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseMusicActivity;
import com.anglll.aflow.utils.DefaultDecoration;
import com.anglll.aflow.utils.Router;

import org.lineageos.eleven.loaders.PlaylistLoader;
import org.lineageos.eleven.model.Playlist;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PlayListActivity extends BaseMusicActivity implements
        LoaderManager.LoaderCallbacks<List<Playlist>>, PlayListController.MusicPlayListCallback {
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;
    @BindView(R.id.title_left)
    AppCompatImageButton mTitleLeft;
    @BindView(R.id.title)
    TextView mTitle;
    @BindView(R.id.sub_title)
    TextView mSubTitle;
    @BindView(R.id.title_right)
    AppCompatImageButton mTitleRight;

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
        mTitle.setText(R.string.playlist);
        controller.setSpanCount(1);
        GridLayoutManager manager = new GridLayoutManager(getContext(), 1);
        manager.setSpanSizeLookup(controller.getSpanSizeLookup());
        mRecyclerView.setLayoutManager(manager);
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.addItemDecoration(new DefaultDecoration(
                getContext().getResources().getDimensionPixelOffset(R.dimen.divider_playlist_card),
                getContext().getResources().getDimensionPixelOffset(R.dimen.divider_playlist_card),
                DefaultDecoration.COLOR_NO
        ));
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

}
