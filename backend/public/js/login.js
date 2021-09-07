const imgKakaoLogin = document.querySelector("#img-kakao-login");

Kakao.init('7ab232123e12f443834fa6ce850b3a9f'); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단
imgKakaoLogin.addEventListener("click", kakaoLogin);
const userInfo = {};

//카카오로그인
function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: async function (response) {
                    console.log(response)
                    // 로그인 성공시 필요한 정보 끌어오기
                    const kakaoAcc = response.kakao_account;
                    const kakaoProfile = kakaoAcc.profile;

                    userInfo.id = response.id;
                    userInfo.email = kakaoAcc.email;
                    userInfo.nickname = kakaoProfile.nickname;
                    userInfo.profileURL = kakaoProfile.profile_image_url;

                    const result = await axios.post("/login",userInfo);
                    console.log(result);
                    // 정상적으로 디비에 추가하면 홈화면으로
                    if(result.data.status===200){
                        location.href = "/";
                    }

                },
                fail: function (error) {
                    console.log(error)
                },
            })
        },
        fail: function (error) {
            console.log(error)
        },
    })
}
