package com.anglll.aflow.data.model;

import java.util.List;

/**
 * Created by yuan on 2017/12/6 0006.
 */

public class Discovery {
    private List<Feed> feedList;
    private List<Feed> activityList;

    public List<Feed> getFeedList() {
        return feedList;
    }

    public void setFeedList(List<Feed> feedList) {
        this.feedList = feedList;
    }

    public List<Feed> getActivityList() {
        return activityList;
    }

    public void setActivityList(List<Feed> activityList) {
        this.activityList = activityList;
    }
}
