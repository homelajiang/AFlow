package com.anglll.aflow.ui.epoxy.models;

import android.support.v7.widget.CardView;
import android.widget.ImageView;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.anglll.aflow.data.model.MultiMedia;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.fresco.helper.Phoenix;

import butterknife.BindView;

/**
 * Created by yuan on 2017/12/6 0006.
 */
@EpoxyModelClass(layout = R.layout.model_media)
public abstract class MediaModel extends EpoxyModelWithHolder<MediaModel.ViewModel> {
    @EpoxyAttribute
    MultiMedia multiMedia;

    @Override
    public void bind(ViewModel holder) {
        holder.bindData(multiMedia);
    }

    @Override
    public int getSpanSize(int totalSpanCount, int position, int itemCount) {
        return totalSpanCount;
    }

    static class ViewModel extends BaseEpoxyHolder<MultiMedia> {
        @BindView(R.id.card_bg)
        SimpleDraweeView mCardBg;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.des)
        TextView mDes;
        @BindView(R.id.my_image_view)
        CardView mMyImageView;

        @Override
        protected void bindData(MultiMedia data) {
            Phoenix.with(mCardBg).load(data.getImage());
            mTitle.setText(data.getTitle());
            mDes.setText(data.getIntro());
        }
    }
}
