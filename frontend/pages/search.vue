<template>
  <div>

    <v-autocomplete
        style="margin: 15px"
        auto-select-first
        clearable
        dense
        filled
        rounded
        solo
        :value="searchValue"
        :items="items"
    ></v-autocomplete>

<!--
    <UserContainer v-for="(v,i) in getRooms" v-bind:key="v.roomName" :room-info="getRooms[i]"/>
-->

  </div>
</template>

<script>
import UserContainer from "@/components/UserContainer";
export default {
  name: "search",
  components: {UserContainer},
  layout: "frame",
  async created() {
    console.log(this.$store.state.user.loginCookie)
    await this.$store.dispatch("room/loadRoom",this.$store.state.user.loginCookie);
    console.log(this.option)

  },
  data(){
    return {
      items:['토론방','공부방','잡담방','책가방'],
      searchValue:"",
      testData: [ 'props-1', 'props-2', 'props-3' ],
      getRooms:this.$store.state.room.roomList
    }
  },
  computed:{
    getRooms() {
      return this.$store.state.room.roomList;
    }

  }
}
</script>

<style scoped>

</style>