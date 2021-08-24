<template>
  <div>
    <div v-if="getUserInfo">
    </div>
    <div v-else>
      <h1>로그인을 먼저 해주세요</h1>
      <nuxt-link to="/login">로그인하러가기</nuxt-link>
    </div>
  </div>
</template>

<script>
import RoomContainer from "@/components/RoomContainer";
export default {
  components: {RoomContainer},
  layout:"frame",
  computed:{
    getUserInfo(){
      return this.$store.state.user.myInfo;
    }
  }
}
</script>

<style scoped>

</style>