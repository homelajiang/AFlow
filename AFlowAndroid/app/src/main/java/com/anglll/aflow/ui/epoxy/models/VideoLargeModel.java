package com.anglll.aflow.ui.epoxy.models;

import android.text.Html;
import android.util.TypedValue;
import android.widget.TextView;

import com.airbnb.epoxy.EpoxyAttribute;
import com.airbnb.epoxy.EpoxyModelClass;
import com.airbnb.epoxy.EpoxyModelWithHolder;
import com.anglll.aflow.R;
import com.anglll.aflow.base.BaseEpoxyHolder;
import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.utils.FuzzyDateFormatter;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.fresco.helper.Phoenix;

import butterknife.BindView;

/**
 * Created by yuan on 2017/11/30.
 */
@EpoxyModelClass(layout = R.layout.model_video_large)
public abstract class VideoLargeModel extends EpoxyModelWithHolder<VideoLargeModel.ViewModel> {
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


    public static class ViewModel extends BaseEpoxyHolder<MultiMedia> {
        @BindView(R.id.avatar)
        SimpleDraweeView mAvatar;
        @BindView(R.id.owner_name)
        TextView mOwnerName;
        @BindView(R.id.release_time)
        TextView mReleaseTime;
        @BindView(R.id.cover)
        SimpleDraweeView mCover;
        @BindView(R.id.title)
        TextView mTitle;
        @BindView(R.id.content)
        TextView mContent;
        @BindView(R.id.play_content)
        TextView mPlayContent;
        @BindView(R.id.comment_count)
        TextView mCommentCount;
        @BindView(R.id.banana_count)
        TextView mBananaCount;

        @Override
        protected void bindData(MultiMedia data) {
            Phoenix.with(mAvatar).load(data.getOwner().getAvatar());
            Phoenix.with(mCover).load(data.getImage());
            mOwnerName.setText(data.getOwner().getName());
            mTitle.setText(data.getTitle());
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                mContent.setText(Html.fromHtml(data.getIntro(), Html.FROM_HTML_MODE_LEGACY));
            } else {
                mContent.setText(Html.fromHtml(data.getIntro()));
            }
            mReleaseTime.setText(FuzzyDateFormatter.getTimeAgo(context, data.getReleaseDate()));
            mPlayContent.setText(String.valueOf(data.getVisit().getViews()));
            mCommentCount.setText(String.valueOf(data.getVisit().getComments()));
            mBananaCount.setText(String.valueOf(data.getVisit().getGoldBanana()));
        }

        public int dp2px(float dpVal) {
            return (int) (TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dpVal, context.getResources().getDisplayMetrics()));
        }
    }

}
