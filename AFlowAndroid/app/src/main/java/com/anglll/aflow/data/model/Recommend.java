package com.anglll.aflow.data.model;

import java.util.List;

/**
 * Created by yuan on 2017/12/6 0006.
 */

public class Recommend {
    List<MultiMedia> carousels;
    List<MultiMedia> recommends;

    public List<MultiMedia> getCarousels() {
        return carousels;
    }

    public void setCarousels(List<MultiMedia> carousels) {
        this.carousels = carousels;
    }

    public List<MultiMedia> getRecommends() {
        return recommends;
    }

    public void setRecommends(List<MultiMedia> recommends) {
        this.recommends = recommends;
    }
}
