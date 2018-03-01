package com.anglll.aflow.data.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by yuan on 2017/12/4 0004.
 */

public class Visit implements Parcelable {

    /**
     * comments : 378
     * goldBanana : 12778
     * danmakuSize : 800
     * views : 94875
     */

    private int comments;
    private int goldBanana;
    private int danmakuSize;
    private int views;

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    public int getGoldBanana() {
        return goldBanana;
    }

    public void setGoldBanana(int goldBanana) {
        this.goldBanana = goldBanana;
    }

    public int getDanmakuSize() {
        return danmakuSize;
    }

    public void setDanmakuSize(int danmakuSize) {
        this.danmakuSize = danmakuSize;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(this.comments);
        dest.writeInt(this.goldBanana);
        dest.writeInt(this.danmakuSize);
        dest.writeInt(this.views);
    }

    public Visit() {
    }

    protected Visit(Parcel in) {
        this.comments = in.readInt();
        this.goldBanana = in.readInt();
        this.danmakuSize = in.readInt();
        this.views = in.readInt();
    }

    public static final Parcelable.Creator<Visit> CREATOR = new Parcelable.Creator<Visit>() {
        @Override
        public Visit createFromParcel(Parcel source) {
            return new Visit(source);
        }

        @Override
        public Visit[] newArray(int size) {
            return new Visit[size];
        }
    };
}
