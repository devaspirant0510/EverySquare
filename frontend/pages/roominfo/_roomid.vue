<template >


  <VideoComponent />

</template>

<script>
import VideoComponent from "@/components/VideoComponent";
export default {
  name: "_room",
  components: {VideoComponent},
  mounted() {
    this.socket = this.$nuxtSocket({
      name:"work",
      channel: '/',
      reconnection:false,
    });
    console.log(this.socket)
    this.socket.emit("message","dfs");
    this.socket.on("join",(msg)=>{
      console.log(msg)
    })
    console.log(this.socket)
  },
  methods:{
    onClickSendButton(){

    }
  }
}
</script>

<style scoped>

</style>