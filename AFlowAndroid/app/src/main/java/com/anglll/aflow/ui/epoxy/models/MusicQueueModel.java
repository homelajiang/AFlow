package com.anglll.aflow.ui.epoxy.models;

import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.AppCompatImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.anglll.aflow.data.model.SongInfo;
import com.anglll.aflow.ui.dialog.PlayQueueCallback;

import org.lineageos.eleven.service.MusicPlaybackTrack;
import org.lineageos.eleven.utils.MusicUtils;

import butterknife.BindView;
import butterknife.OnClick;

@EpoxyModelClass(layout = R.layout.model_music_playlist_track)
public abstract class MusicQueueModel extends EpoxyModelWithHolder<MusicQueueModel.ViewHolder> {

    @EpoxyAttribute
    SongInfo playingSong;
    @EpoxyAttribute
    PlayQueueCallback callback;

    @Override
    public void bind(@NonNull ViewHolder holder) {
        holder.bindData(playingSong);
    }

    @Override
    public int getSpanSize(int totalSpanCount, int position, int itemCount) {
        return totalSpanCount;
    }

    class ViewHolder extends BaseEpoxyHolder<SongInfo> {
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.delete_form_queue)
        AppCompatImageButton mDeleteFormQueue;
        @BindView(R.id.item_layout)
        LinearLayout mItemLayout;

        @OnClick(R.id.delete_form_queue)
        void removeFromQueue() {
            if (callback != null && playingSong != null)
                callback.removeFromQueue(playingSong);
        }

        @Override
        protected void bindData(SongInfo data) {
            if (data != null) {
                mTitle.setText(data.mSongName);
                MusicPlaybackTrack track = MusicUtils.getCurrentTrack();
                if (track != null && track.mId == data.mSongId) {
                    mTitle.setTextColor(ContextCompat.getColor(context, R.color.accent));
                } else {
                    mTitle.setTextColor(ContextCompat.getColor(context, R.color.default_text_color));
                }
            }
        }
    }
}
