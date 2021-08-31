<template>

  <div>
    <RoomPost/>
  </div>

</template>

<script>
import RoomPost from "@/components/RoomPost";

export default {
  name: "LayoutPostRoom",
  components: {RoomPost},
  computed: {
    getRooms() {
      return this.$store.state.room.roomList;
    },
    getUserInfo() {
      return this.$store.state.user.myInfo;
    }
  }
}
</script>

<style scoped>

</style>