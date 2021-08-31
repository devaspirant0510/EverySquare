<template style="height: 100px">
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    name() {
      return this.$store.state.room.roomName;
    },
    name1() {
      return this.$store.state.counter;
    }
  },
  methods: {
    setChangeName() {
      this.$store.commit("room/setRoomName");
    },
    setChangeCounter() {
      this.$store.commit("user/setUserId", "afdssdaf")
    }
  }

}
</script>

<style scoped>

</style>