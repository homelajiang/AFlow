package com.anglll.aflow.data.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by yuan on 2017/12/4 0004.
 */

public class Owner implements Parcelable {

    /**
     * name : 鲁路修·VI布里塔尼亚
     * avatar : http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201703/06114828sggxtcb5.jpg
     * id : 243400
     */

    private String name;
    private String avatar;
    private int id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.name);
        dest.writeString(this.avatar);
        dest.writeInt(this.id);
    }

    public Owner() {
    }

    protected Owner(Parcel in) {
        this.name = in.readString();
        this.avatar = in.readString();
        this.id = in.readInt();
    }

    public static final Parcelable.Creator<Owner> CREATOR = new Parcelable.Creator<Owner>() {
        @Override
        public Owner createFromParcel(Parcel source) {
            return new Owner(source);
        }

        @Override
        public Owner[] newArray(int size) {
            return new Owner[size];
        }
    };
}
