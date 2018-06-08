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

import org.lineageos.eleven.loaders.LastAddedLoader;
import org.lineageos.eleven.model.Song;
import org.lineageos.eleven.sectionadapter.SectionCreator;
import org.lineageos.eleven.sectionadapter.SectionListContainer;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class DetailActivity extends BaseMusicActivity {
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;

    private DetailController controller = new DetailController(null, null);

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_playlist_detail);
        ButterKnife.bind(this);
        initView();
    }

    private void initView() {
        controller.setSpanCount(1);
        GridLayoutManager manager = new GridLayoutManager(getContext(), 1);
        manager.setSpanSizeLookup(controller.getSpanSizeLookup());
        mRecyclerView.setLayoutManager(manager);
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());

        initLoader(3, null, new DefaultPlayListCallback());
    }

    class UserPlayListCallback implements LoaderManager.LoaderCallbacks<List<Song>> {

        @NonNull
        @Override
        public Loader<List<Song>> onCreateLoader(int id, @Nullable Bundle args) {
//            return new PlaylistSongLoader(this, mPlaylistId);
            return null;
        }

        @Override
        public void onLoadFinished(@NonNull Loader<List<Song>> loader, List<Song> data) {

        }

        @Override
        public void onLoaderReset(@NonNull Loader<List<Song>> loader) {

        }
    }

    class DefaultPlayListCallback implements LoaderManager.LoaderCallbacks<SectionListContainer<Song>> {

        @NonNull
        @Override
        public Loader<SectionListContainer<Song>> onCreateLoader(int id, @Nullable Bundle args) {
/*            TopTracksLoader loader = new TopTracksLoader(getActivity(),
                    TopTracksLoader.QueryType.RecentSongs);
            return new SectionCreator<Song>(getActivity(), loader, null);*/

            LastAddedLoader loader = new LastAddedLoader(DetailActivity.this);
            return new SectionCreator<Song>(DetailActivity.this, loader, null);

/*            TopTracksLoader loader = new TopTracksLoader(getActivity(),
                    TopTracksLoader.QueryType.TopTracks);
            return new SectionCreator<Song>(getActivity(), loader, null);*/
        }

        @Override
        public void onLoadFinished(@NonNull Loader<SectionListContainer<Song>> loader, SectionListContainer<Song> data) {
            controller.setData(data.mListResults);
        }

        @Override
        public void onLoaderReset(@NonNull Loader<SectionListContainer<Song>> loader) {

        }
    }
}
