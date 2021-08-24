<template>
  <div>
    <video ref="myVideo">

    </video>
    <v-icon
        large
        color="green darken-2"
    >
      mdi-camera-off
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "VideoComponent",
  layout: "frame",
  mounted() {
    const defaultConstrains = {
      audio: true,
      video: true,
    }
    let localVideo = this.$refs.myVideo;

    navigator.mediaDevices.getUserMedia(defaultConstrains)
        .then(stream => {
          localVideo.srcObject = stream;
          localVideo.addEventListener("loadedmetadata",()=>{
            localVideo.play();
          });
        }).catch(err => {
      console.log(err);
    });
  },
  data() {
    return {
      items: [
        {item: ["마이크", "마이크 끄기"], icon: ["mdi-camera", "mdi-camera-off"]},
        {item: ["카메라", "카메라 끄기"], icon: ["mdi-camera", "mdi-camera-off"]},
        {item: ["화면공유", "화면공유 종료"], icon: ["mdi-camera", "mdi-camera-off"]},
        {item: ["음소거", ""], icon: ["mdi-camera", "mdi-camera-off"]},
      ]

    }
  }
}
</script>

<style scoped>

</style>