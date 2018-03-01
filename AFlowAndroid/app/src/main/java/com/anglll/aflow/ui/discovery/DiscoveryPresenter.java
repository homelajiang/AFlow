package com.anglll.aflow.ui.discovery;

import com.anglll.aflow.data.model.MultiMedia;
import com.anglll.aflow.data.source.AppRepository;

import java.util.List;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;
import io.reactivex.internal.disposables.ListCompositeDisposable;
import io.reactivex.schedulers.Schedulers;

/**
 * Created by yuan on 2017/12/4 0004.
 */

public class DiscoveryPresenter implements DiscoveryContract.Presenter {

    private DiscoveryContract.View view;
    private final ListCompositeDisposable listCompositeDisposable;
    private final AppRepository appRepository;

    public DiscoveryPresenter(DiscoveryContract.View view) {
        this.view = view;
        listCompositeDisposable = new ListCompositeDisposable();
        appRepository = AppRepository.getInstance();
        this.view.setPresenter(this);
    }

    @Override
    public void subscribe() {

    }

    @Override
    public void unSubscribe() {
        if (!listCompositeDisposable.isDisposed()) {//是否处理资源
            listCompositeDisposable.clear();
        }
        this.view = null;
    }

    @Override
    public void getDiscovery() {
        Disposable disposable = appRepository.getDiscovery()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<List<MultiMedia>>() {
                    @Override
                    public void accept(List<MultiMedia> multiMedia) throws Exception {
                        view.getDiscovery(multiMedia);
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) throws Exception {
                        view.getDiscoveryFail();
                    }
                });
        listCompositeDisposable.add(disposable);
    }
}
