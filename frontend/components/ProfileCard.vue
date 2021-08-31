<template>
  <v-card>
    <v-card-title>
      로그인에 성공하였습니다.
    </v-card-title>
    <v-row>
      <v-col
          cols="2" style="margin: auto auto">
        <div>
          <v-avatar
              size="150px">
            <img id="img-profile-url" v-bind:src="getUserInfo.profileURL"/>
          </v-avatar>
        </div>
        <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar">

        </v-file-input>

      </v-col>
      <v-col
          cols="9">
        <v-text-field
            label="email"
            v-bind:value="getUserInfo.email"
            disabled>
        </v-text-field>
        <v-text-field
            label="nickname"
            v-bind:value="getUserInfo.nickname">
        </v-text-field>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn style="width: 100%; margin-left: 30px; margin-right: 30px">
          확인
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ProfileCard",
  data() {
    return {
      imageValue:"",
    }
  },
  computed: {
    getUserInfo() {
      return this.$store.state.user.myInfo;
    }
  },
  methods: {
    onClickConfirm(){
/*
      this.$store.dispatch("user/registerData",{

      });
*/
      this.$router.push("/");
    }
  }
}
</script>


<style scoped>

#img-profile-url {
  width: 150px;
  height: 150px;
}

</style>