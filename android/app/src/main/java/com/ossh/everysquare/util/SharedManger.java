package com.ossh.everysquare.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : SharedManger.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 */
public class SharedManger {
    private static final String TAG = SharedManger.class.getSimpleName();
    public static final String LOGIN_INFO             = "login_info";
    public static final String SAVE_STATE_EMAIL       = "email";
    public static final String SAVE_STATE_NICKNAME    = "nickname";
    public static final String SAVE_STATE_PROFILE_URL = "profileURL";
    public static final String SAVE_STATE_ID          = "userId";
    public static final String SAVE_STATE_IS_LOGIN    = "isLogin";
    public static final String SAVE_STATE_USER_COOKIE = "userCookie";

    private static SharedPreferences mPref;

    public SharedManger() {

    }

    public static void init(String name, Context context) {
        if (mPref == null) {
            mPref = context.getSharedPreferences(name, Context.MODE_PRIVATE);
        }
    }

    public static void removePref() {
        if (mPref != null) {
            mPref = null;
            return;
        }
        throw new Error("SharedPreference 가 생성되지 않았는데 삭제할수 없어요");
    }

    public static void saveData(String key, String val) {
        if (mPref != null) {
            SharedPreferences.Editor editor = mPref.edit();
            Log.e(TAG, "saveData: " + editor);
            editor.putString(key, val);
            editor.apply();
            return;
        }
        throw new Error("SharedPreference 를 초기화 해주세요");
    }

    public static void saveData(String key, boolean value) {
        if (mPref != null) {
            SharedPreferences.Editor editor = mPref.edit();
            editor.putBoolean(key, value);
            editor.apply();
            return;
        }
        throw new Error("SharedPreference 를 초기화 해주세요");
    }

    public static String loadData(String key, String defaultVal) {
        if (mPref != null) {
            return mPref.getString(key, defaultVal);
        }
        throw new Error("SharedPreference 를 초기화 해주세요");
    }

    public static boolean loadData(String key, boolean defaultVal) {
        if (mPref != null) {
            return mPref.getBoolean(key, defaultVal);
        }
        throw new Error("SharedPreference 를 초기화 해주세요");
    }
}
