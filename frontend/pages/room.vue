<template>
  <div v-if="$route.path==='/room'">
    <LayoutPostRoom/>
  </div>
</template>

<script>
import RoomPost from "@/components/RoomPost";
import LayoutPostRoom from "@/components/LayoutPostRoom";
import VideoComponent from "@/components/VideoComponent";
let showFrame = "frame"
export default {
  async created() {

  },
  data(){
    return{
      showFrame:"frame",
    }
  },
  methods:{

  },
  layout:showFrame,
  components: {
    LayoutPostRoom,
    VideoComponent,
    RoomPost,
  },
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
#main-page {
  display: flex;
}

#navigation-view {
}

#room-list-view {
}
</style>