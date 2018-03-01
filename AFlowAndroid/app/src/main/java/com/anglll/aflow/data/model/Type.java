package com.anglll.aflow.data.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by yuan on 2017/12/4 0004.
 */

public class Type implements Parcelable {

    /**
     * name : 视频
     * id : 1
     * value : videos
     */

    private String name;
    private int id;
    private String value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.name);
        dest.writeInt(this.id);
        dest.writeString(this.value);
    }

    public Type() {
    }

    protected Type(Parcel in) {
        this.name = in.readString();
        this.id = in.readInt();
        this.value = in.readString();
    }

    public static final Parcelable.Creator<Type> CREATOR = new Parcelable.Creator<Type>() {
        @Override
        public Type createFromParcel(Parcel source) {
            return new Type(source);
        }

        @Override
        public Type[] newArray(int size) {
            return new Type[size];
        }
    };
}
