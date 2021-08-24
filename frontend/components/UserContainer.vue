<template>
  <v-card
      elevation="2"
      outlined
      shaped
      v-on:click="onClickRoomItem"
  >
    <v-list-item-avatar>
      <v-img v-bind:src="getUserInfo.userProfile"></v-img>

    </v-list-item-avatar>
    <v-card-title>
      {{ roomInfo.roomName }}
    </v-card-title>
    <v-card-subtitle>
      {{roomInfo.roomDescription}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    roomInfo: {
      type: Object,
      default: null
    }
  },
  methods:{
    onClickRoomItem(){
      // 네트워크 요청으로 uuid 가져와서 붙혀줌
      this.$router.push("room?id=12341234");

    }
  },


  computed: {
    getUserInfo() {
      return this.$store.state.user.myInfo;
    }
  }
}
</script>

<style scoped>

</style>