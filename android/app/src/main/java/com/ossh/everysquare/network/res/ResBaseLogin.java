package com.ossh.everysquare.network.res;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : ResBaseLogin.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 */
public class ResBaseLogin {
    private static final String TAG = ResBaseLogin.class.getSimpleName();
    private int status;
    private String message;
    private ResLogin data;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ResLogin getData() {
        return data;
    }

    public void setData(ResLogin data) {
        this.data = data;
    }
}
