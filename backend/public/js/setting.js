const kakaoLogoutButton = document.querySelector("#btn-kakao-logout");

kakaoLogoutButton.addEventListener("click",()=>{
    console.log("asdf")
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: async function (response) {
                console.log(response);
                const result = await axios.post("/logout");
                console.log(result);
                location.href = "/"
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
    }
});
