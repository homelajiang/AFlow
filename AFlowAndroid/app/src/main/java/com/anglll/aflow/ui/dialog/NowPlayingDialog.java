package com.anglll.aflow.ui.dialog;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomSheetDialog;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.airbnb.epoxy.TypedEpoxyController;
import com.anglll.aflow.R;
import com.anglll.aflow.data.model.NowPlayingQueue;

import org.lineageos.eleven.model.Song;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class NowPlayingDialog extends BottomSheetDialog {
    private final NowPlayingController controller;
    private NowPlayingQueue nowPlayingQueue;
    @BindView(R.id.title)
    TextView mTitle;
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;

    public NowPlayingDialog(@NonNull Context context, NowPlayingQueue nowPlayingQueue) {
        super(context);
        View view = getLayoutInflater().inflate(R.layout.dialog_now_playing, null);
        ButterKnife.bind(this, view);
        this.nowPlayingQueue = nowPlayingQueue;
        controller =
                new NowPlayingController();
        mRecyclerView.setLayoutManager(new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(controller.getAdapter());
        updateController();
    }

    public void updateController() {
        controller.setData(nowPlayingQueue);
    }

    public void setSonglist(NowPlayingQueue nowPlayingQueue) {
        this.nowPlayingQueue = nowPlayingQueue;
        updateController();
    }


    public class NowPlayingController extends TypedEpoxyController<NowPlayingQueue> {


        @Override
        protected void buildModels(NowPlayingQueue queue) {

        }
    }

}
