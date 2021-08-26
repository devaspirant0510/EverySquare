package com.ossh.everysquare.network;

import android.content.Context;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : RetrofitHelper.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description : 레트로핏 싱글톤
 */
public class RetrofitHelper {
    private static final String TAG = RetrofitHelper.class.getSimpleName();

    private Context mContext;
    private Retrofit retrofit;
    private EverySquareAPI everySquareAPI;

    public static RetrofitHelper retrofitHelper = new RetrofitHelper();
    public static final String BASE_URL = "http://www.every-square.shop:8080";


    private RetrofitHelper() {
        OkHttpClient client = new OkHttpClient();
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        everySquareAPI = retrofit.create(EverySquareAPI.class);
    }

    public static RetrofitHelper getInstance(){
        return retrofitHelper;
    }

    public EverySquareAPI getSquareAPI(){
        return everySquareAPI;
    }
}
