package com.ossh.everysquare.network.req;

/**
 * @author : seungHo
 * @since : 2021-08-26
 * class : ReqPostLogin.java
 * github : devaspirant0510
 * email : seungho020510@gmail.com
 * description :
 * {
 *     "id":"144532333244444",
 *     "nickname":"jack",
 *     "email":"seungho3302044510@gmail.com",
 *     "profileURL":"https://www.evertsqure/image/2.png"
 * }
 */
public class ReqPostLogin {
    private static final String TAG = ReqPostLogin.class.getSimpleName();
    private String id;
    private String nickname;
    private String email;
    private String profileURL;

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

    public void setProfileURL(String profileURL) {
        this.profileURL = profileURL;
    }
}
