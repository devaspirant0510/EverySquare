package com.ossh.everysquare.network.res;

import java.util.Date;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : ResLogin.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 *         "createdAt": "2021-08-26T04:59:23.239Z",
 *         "id": "144532333244444",
 *         "nickname": "jack",
 *         "email": "seungho3302044510@gmail.com",
 *         "profileURL": "https://www.evertsqure/image/2.png"
 */
public class ResLogin {
    private static final String TAG = ResLogin.class.getSimpleName();
    private Date createdAt;
    private String id;
    private String nickname;
    private String email;
    private String profileURL;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileURL() {
        return profileURL;
    }

    public void setProfileURl(String profileURL) {
        this.profileURL = profileURL;
    }
}
