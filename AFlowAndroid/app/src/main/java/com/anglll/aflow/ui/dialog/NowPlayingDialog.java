package com.anglll.aflow.ui.dialog;

import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomSheetDialogFragment;
import android.support.v4.app.LoaderManager;

import android.support.v4.content.Loader;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.R;
import com.anglll.aflow.data.model.NowPlayingQueue;
import com.anglll.aflow.ui.epoxy.models.MusicQueueModel_;

import org.lineageos.eleven.MusicPlaybackService;
import org.lineageos.eleven.loaders.QueueLoader;
import org.lineageos.eleven.model.Song;
import org.lineageos.eleven.utils.MusicUtils;

import java.lang.ref.WeakReference;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

import static org.lineageos.eleven.utils.MusicUtils.mService;

public class NowPlayingDialog extends BottomSheetDialogFragment implements
        LoaderManager.LoaderCallbacks<List<Song>>, ServiceConnection {
    private NowPlayingController controller;
    private NowPlayingQueue nowPlayingQueue = new NowPlayingQueue();
    @BindView(R.id.title)
    TextView mTitle;
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;

    /**
     * LoaderCallbacks identifier
     */
    private static final int LOADER = 0;
    private QueueUpdateListener mQueueUpdateListener;
    private MusicUtils.ServiceToken mToken;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.dialog_now_playing, container, false);
        ButterKnife.bind(this, view);
        controller =
                new NowPlayingController();
        mRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity(), LinearLayoutManager.VERTICAL, false));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());
        return view;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        // Initialize the broadcast receiver
        mQueueUpdateListener = new QueueUpdateListener(this);

        // Bind Eleven's service
        mToken = MusicUtils.bindToService(getActivity(), this);
    }

    public void updateController() {
        controller.setData(nowPlayingQueue);
    }

    @NonNull
    @Override
    public Loader<List<Song>> onCreateLoader(int id, @Nullable Bundle args) {
        return new QueueLoader(getActivity());
    }

    @Override
    public void onLoadFinished(@NonNull Loader<List<Song>> loader, List<Song> data) {
        this.nowPlayingQueue.songs = data;
        this.nowPlayingQueue.playingIndex = MusicUtils.getQueuePosition();
        updateController();
    }

    @Override
    public void onLoaderReset(@NonNull Loader<List<Song>> loader) {

    }


    @Override
    public void onServiceConnected(ComponentName name, IBinder service) {
        refreshQueue();
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        try {
            getActivity().unregisterReceiver(mQueueUpdateListener);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(mService!=null){
            MusicUtils.unbindFromService(mToken);
            mToken=null;
        }
    }

    private void refreshQueue() {
        if (isAdded())
            getLoaderManager().restartLoader(LOADER, null, this);
    }

    private void updateCurrentQueuePosition() {
        this.nowPlayingQueue.playingIndex = MusicUtils.getQueuePosition();
        updateController();
    }


    public class NowPlayingController extends TypedEpoxyController<NowPlayingQueue> {

        @Override
        protected void buildModels(NowPlayingQueue queue) {
            for (Song song : queue.songs) {
                add(new MusicQueueModel_()
                        .id(song.hashCode())
                        .playingSong(song));
            }
        }
    }


    public static final class QueueUpdateListener extends BroadcastReceiver {
        private final WeakReference<NowPlayingDialog> mReference;

        public QueueUpdateListener(final NowPlayingDialog fragment) {
            mReference = new WeakReference<>(fragment);
        }

        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            if (MusicPlaybackService.META_CHANGED.equals(action)) {
                mReference.get().updateCurrentQueuePosition();
            } else if (MusicPlaybackService.PLAYSTATE_CHANGED.equals(action)) {
                //update play status
            } else if (MusicPlaybackService.QUEUE_CHANGED.equals(action)) {
                mReference.get().refreshQueue();
            }
        }
    }

}
