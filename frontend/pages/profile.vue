<template>
  <div>
    <UserContainer/>

  </div>

</template>

<script>
import UserContainer from "@/components/UserContainer";
export default {
  components: {UserContainer},
  computed:{
    getUserInfo(){
      return this.$store.state.user.myInfo;

    }
  }
}
</script>

<style scoped>

</style>