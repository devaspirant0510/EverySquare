const imgKakaoLogin = document.querySelector("#img-kakao-login");

window.onload = () => {
    Kakao.init('064e7adfbf5f09667f51259dd2ec3890');
    Kakao.isInitialized();
    const url = new URL(window.location.href);
    const token = url.searchParams.get("accessToken")
    Kakao.Auth.setAccessToken(token);
    Kakao.API.request({
        url: 'v2/user/me',
        async success(response) {
            console.log(response)
        }
    })

}
imgKakaoLogin.addEventListener("click", async () => {
    /*
        Kakao.Auth.authorize({
            redirectUri:`${window.location.origin}/login_callback_kakao`
        });
    */
    await axios.post("/login", {
        id: "1869976538",
        nickname: "승호",
        email:"nova020510@naver.com",
        profileURL:"http://k.kakaocdn.net/dn/HwAKC/btrctvvgubC/jX1cIa2iU3psChbNRorknk/img_640x640.jpg"

    });
    location.href = "/";

});