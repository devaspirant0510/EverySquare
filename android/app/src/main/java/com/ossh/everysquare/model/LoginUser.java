package com.ossh.everysquare.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * @author : seungHo
 * @since : 2021-08-25
 * class : LoginUser.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 */
public class LoginUser implements Serializable {
    private static final String TAG = LoginUser.class.getSimpleName();
    private String id;
    private String email;
    private String nickname;
    private String profileURL;

    public LoginUser(){

    }

    public LoginUser(String id,String email, String nickname, String profileURL) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.profileURL = profileURL;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileURL() {
        return profileURL;
    }

    public void setProfileURL(String profileURL) {
        this.profileURL = profileURL;
    }
}
