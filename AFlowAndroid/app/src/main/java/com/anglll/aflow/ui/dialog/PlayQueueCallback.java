package com.anglll.aflow.ui.dialog;

import com.anglll.aflow.data.model.SongInfo;

public interface PlayQueueCallback {
    void removeFromQueue(SongInfo song);

    void playIndex(int position);
}
