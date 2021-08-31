<template>
  <div id="root-container">

    <v-parallax style="width: 100%;" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <h1>Welcome!</h1>
      <h1 id="title">Every Square</h1>
      <div>
        <v-btn id="btn-google-login" to="/room" v-on:click="onClickGoogleLogin"
               color="primary" depressed elevation="11" outlined
               plain raised rounded>구글 로그인
        </v-btn>
      </div>
      <img src="~assets/kakao_login_medium_wide.png" @click="kakaoLogin" style="width: 300px"/>
    </v-parallax>
  </div>

</template>

<script>
import axios from "axios";
import LayoutPostRoom from "@/components/LayoutPostRoom";

export default {
  async created() {
    // 로그인 요청하고 쿠키에 로그인 정보가 있는지 확인
    const result = await axios.get("http://127.0.0.1:8081/login",{
      withCredentials:true
    });
    console.log(result)
    if(result.data.data){
      await this.$router.push("/");
    }else{
      // 카카오 로그인 API 세팅
      Kakao.init('064e7adfbf5f09667f51259dd2ec3890');
      Kakao.isInitialized();
      Kakao.Auth.setAccessToken(this.$route.params.accessToken);

      const vue = this;
      Kakao.API.request({
        url: '/v2/user/me',
        async success(response) {
          console.log(response)
          console.log(response.kakao_account)
          const kakaoAcc = response.kakao_account;
          const kakaoProfile = kakaoAcc.profile;

          const userId = response.id;
          const email = kakaoAcc.email;
          const name = kakaoProfile.nickname;
          const profile = kakaoProfile.profile_image_url;
          console.log(userId)
          const payload = {
            id:userId,
            nickname:name,
            email:email,
            profileURL:profile,
          }
          await vue.$store.dispatch("user/registerData", payload);
          const result = await axios.post(
              "http://127.0.0.1:8081/login",
              payload,
              {withCredentials: true}
          );
          console.log(result)
          console.log(result.data.message);
          console.log(result.headers)
          console.log(result.data.data.user)
          const userCookie = result.data.data.user;
          await vue.$store.dispatch("user/setLoginCookie",userCookie);

          if(result.data.message==="you are everySquare member"){
            await vue.$router.push("/");
          }
          else{
            await vue.$router.push("/register");
          }
          console.log(vue.$store.state.myInfo);
        },
        fail(error) {
          console.log(error)
        }
      });

    }


  },
  components: {LayoutPostRoom},
  data() {
    return {
      name: "welcome EverySquare"
    }
  },
  methods: {
    async onClickKakaoLogin() {
      console.log("onClickKakaoLogin button ")
      const result =  this.$store.commit("user/setUser",{
        userId:"3532452345",
        userName:"유클립트",
        userEmail:"seungho020510@gmail.com",
        userProfile:"https://k.kakaocdn.net/dn/FAR5Q/btq3hvbN88f/Ya9z0ZDT3loMyo8E6Rb61K/img_640x640.jpg",
        createdAt:"2021-04-05",
        userSocketId:"#room/f4937fduh"
      });
      console.log(result)
      await this.$router.push("/")
    },
    async onClickGoogleLogin() {
      const result = await this.$store.dispatch("user/login",{
        userId:"3532452345",
        userName:"유클립트",
        userProfile:"https://img.jpg",
        createdAt:"2021-04-05",
        userSocketId:"#room/f4937fduh"
      });
      console.log(result)
      await this.$router.push("/")
    },
    kakaoLogin() {
      Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/login_callback_kakao`
      })
    }
  }
}
</script>

<style scoped>
#root-container {
}

#title {
  margin-top: 30px;
  margin-bottom: 30px;
}

#btn-kakako-login {
  margin-top: 30px;
  margin-bottom: 30px;
}

#btn-google-login {
  margin-top: 30px;
  margin-bottom: 30px;

}
</style>