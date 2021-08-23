<template>
  <div id="root-container">

    <v-parallax style="width: 100%" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <h1>Welcome!</h1>
      <h1 id="title">Every Square</h1>
      <div>
        <v-btn id="btn-kakako-login"
               v-on:click="onClickKakaoLogin"
               color="primary" depressed elevation="11" outlined
               plain raised rounded>카카오 로그인
        </v-btn>
      </div>
      <div>
        <v-btn id="btn-google-login" to="/room" v-on:click="onClickGoogleLogin"
               color="primary" depressed elevation="11" outlined
               plain raised rounded>구글 로그인
        </v-btn>
      </div>

    </v-parallax>
  </div>

</template>

<script>
import axios from "axios";

export default {
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
      await this.$router.push("/room")
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
      await this.$router.push("/room")
    }
  }
}
</script>

<style scoped>
#root-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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