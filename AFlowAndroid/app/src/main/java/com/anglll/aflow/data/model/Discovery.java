package com.anglll.aflow.data.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yuan on 2017/12/6 0006.
 */

public class Discovery {
    private List<Feed> feedList = new ArrayList<>();
    private List<Feed> activityList = new ArrayList<>();

    public List<Feed> getFeedList() {
        return feedList;
    }

    public void setFeedList(List<Feed> feedList) {
        this.feedList = feedList;
    }

    public void addFeedList(List<Feed> feedList) {
        this.feedList.addAll(feedList);
    }

    public List<Feed> getActivityList() {
        return activityList;
    }

    public void setActivityList(List<Feed> activityList) {
        this.activityList = activityList;
    }
}
