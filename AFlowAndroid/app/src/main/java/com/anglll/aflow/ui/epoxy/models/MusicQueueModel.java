package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.support.v7.widget.AppCompatImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;

import org.lineageos.eleven.model.Song;

import butterknife.BindView;

@EpoxyModelClass(layout = R.layout.model_music_playlist_track)
public abstract class MusicQueueModel extends EpoxyModelWithHolder<MusicQueueModel.ViewHolder> {

    @EpoxyAttribute
    Song playingSong;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(playingSong);
    }

    @Override
    public int getSpanSize(int totalSpanCount, int position, int itemCount) {
        return totalSpanCount;
    }

    class ViewHolder extends BaseEpoxyHolder<Song> {
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.delete_form_queue)
        AppCompatImageButton mDeleteFormQueue;
        @BindView(R.id.item_layout)
        LinearLayout mItemLayout;

        @Override
        protected void bindData(Song data) {
            if (data != null)
                mTitle.setText(data.mSongName);
        }
    }
}
