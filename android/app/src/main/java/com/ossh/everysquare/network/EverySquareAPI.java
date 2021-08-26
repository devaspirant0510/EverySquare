package com.ossh.everysquare.network;

import com.ossh.everysquare.network.req.ReqPostLogin;
import com.ossh.everysquare.network.res.ResBaseLogin;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : EverySquareAPI.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 */
public interface EverySquareAPI {
    @POST("/login")
    Call<ResBaseLogin> postLogin(@Body ReqPostLogin reqPostLogin);

}
