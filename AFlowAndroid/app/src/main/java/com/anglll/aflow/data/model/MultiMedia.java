package com.anglll.aflow.data.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by yuan on 2017/12/2 0002.
 */

public class MultiMedia implements Parcelable {

    /**
     * type : {"name":"视频","id":1,"value":"videos"}
     * image : http://imgs.aixifan.com/content/2017_11_02/1512245236.gif
     * releaseDate : 1512277601000
     * title : AcFun评论才是本体【2017年10月下篇】
     * intro : 金香蕉奖投票地址：http://www.acfun.cn/sp/topup2017 封面AC娘表情包：ac4113626<br/>BGM网易云音乐：http://music.163.com/#/m/playlist?id=1996627603<br/>BGM和封面等度娘下载地址：https://pan.baidu.com/s/1nvvaRBr 上期本体回顾：ac4105729<br/>致郁篇：ac4079450 感谢大家
     * visit : {"comments":378,"goldBanana":12778,"danmakuSize":800,"views":94875}
     * owner : {"name":"鲁路修·VI布里塔尼亚","avatar":"http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201703/06114828sggxtcb5.jpg","id":243400}
     * article : 
     */

    private Type type;
    private long contentId;
    private String image;
    private long releaseDate;
    private String title;
    private String intro;
    private Visit visit;
    private Owner owner;
    private String article;

    public long getContentId() {
        return contentId;
    }

    public void setContentId(long contentId) {
        this.contentId = contentId;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public long getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(long releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeParcelable(this.type, flags);
        dest.writeLong(this.contentId);
        dest.writeString(this.image);
        dest.writeLong(this.releaseDate);
        dest.writeString(this.title);
        dest.writeString(this.intro);
        dest.writeParcelable(this.visit, flags);
        dest.writeParcelable(this.owner, flags);
        dest.writeString(this.article);
    }

    public MultiMedia() {
    }

    protected MultiMedia(Parcel in) {
        this.type = in.readParcelable(Type.class.getClassLoader());
        this.contentId = in.readLong();
        this.image = in.readString();
        this.releaseDate = in.readLong();
        this.title = in.readString();
        this.intro = in.readString();
        this.visit = in.readParcelable(Visit.class.getClassLoader());
        this.owner = in.readParcelable(Owner.class.getClassLoader());
        this.article = in.readString();
    }

    public static final Creator<MultiMedia> CREATOR = new Creator<MultiMedia>() {
        @Override
        public MultiMedia createFromParcel(Parcel source) {
            return new MultiMedia(source);
        }

        @Override
        public MultiMedia[] newArray(int size) {
            return new MultiMedia[size];
        }
    };
}
