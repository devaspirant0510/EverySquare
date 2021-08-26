package com.ossh.everysquare.application;

import android.app.Application;

import com.kakao.sdk.common.KakaoSdk;

/**
 * @author : seungHo
 * @since : 2021-08-25
 * class : KakaoApplication.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description : 카카오 sdk
 */
public class KakaoApplication extends Application {
    private static final String TAG = KakaoApplication.class.getSimpleName();

    @Override
    public void onCreate() {
        super.onCreate();
        KakaoSdk.init(this,"cd11619f6c7dc0b6ef7c0745ebdff51f");
    }
}
