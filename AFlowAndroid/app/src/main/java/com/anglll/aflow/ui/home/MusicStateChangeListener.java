package com.anglll.aflow.ui.home;

import org.lineageos.eleven.MusicStateListener;

public interface MusicStateChangeListener extends MusicStateListener {
    void onUpdateController();

    void cacheUnpaused();
}
