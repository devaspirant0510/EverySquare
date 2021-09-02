<template>
  <div class="main-grid">
    <div class="video-grid">
      <div class="item">

      </div>
      <div class="item">

      </div>
      <div class="item">

      </div>
      <video ref="myVideo"></video>
    </div>
    <v-bottom-navigation >
      <v-btn v-on:click="onCamera">
        <span>{{cameraStatus}}</span>
        <v-icon>{{cameraIcon}}</v-icon>
      </v-btn>

      <v-btn v-on:click="onMic">
        <span>{{audioStatus}}</span>
        <v-icon>{{audioIcon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
let localMyVid;
export default {
  name: "VideoComponent",
  layout: "frame",
  mounted() {
    const socket = io.connect("http://127.0.0.1:8081/socket.io", {
      path: "/socket.io",
      reconnection:false
    });
    console.log(socket)
    socket.on("join",(msg)=>{
      console.log(msg);
    });
    console.log("mounted")
    socket.emit("message","asfd");
    const defaultConstrains = {
      audio: true,
      video: true,
    }
    let localVideo = this.$refs.myVideo;
    navigator.mediaDevices.getUserMedia(defaultConstrains)
        .then(stream => {
          console.log(stream)
          this.$store.dispatch("video/setLocalStream",stream);
          localVideo.srcObject = stream;
          localVideo.addEventListener("loadedmetadata",()=>{
            localVideo.play();
          });
        }).catch(err => {
      console.log(err);
    });
  },
  methods:{
    // 카메라 버튼을 눌렀을때
    async onCamera(){
      // 카메라가 켜져있으면 카메라 끄기
      if(this.isOnCamera){
        this.cameraStatus = "카메라"
        this.isOnCamera = false;
        this.$refs.myVideo.pause();
        console.log("stream is stop")
        this.$refs.myVideo.srcObject = null;
        this.$store.state.video.localStream.getTracks()[0].stop();
        await this.$store.dispatch("video/setLocalStream",null);
      }
      // 카메라가 꺼져있으면 카메라 켜기
      else{
        this.cameraStatus = "카메라 끄기"
        this.isOnCamera = true;
        const defaultConstrains = {
          audio: true,
          video: true,
        }
        let localVideo = this.$refs.myVideo;
        navigator.mediaDevices.getUserMedia(defaultConstrains)
            .then(stream => {
              console.log("stream is open")

              this.$store.dispatch("video/setLocalStream",stream);
              localVideo.srcObject = stream;
              localVideo.addEventListener("loadedmetadata",()=>{
                localVideo.play();
              });
            }).catch(err => {
          console.log(err);
        });

      }

    },
    // 마이크 버튼을 눌렀을때
    async onMic(){
      // 마이크가 켜져있을때
      if(this.isOnMic){
        const audioTrack = this.$store.state.video.localStream.getAudioTracks()
        audioTrack[0].stop();

      }

    },
    onClickBottomNaviItem(value){
      // 카메라 끄기 버튼
      console.log(value)
      console.log(value[0])
      console.log(this.defaultItem)

      const getIdx = this.defaultItem.indexOf(value[0])
      console.log(getIdx)
      console.log(this.items[0].item[0])
      if(value[0]===this.items[0].item[0]){
        value[0] = this.items[0].item[1]
      }
      else if(value[1]===this.items[0].item[1]){
        const defaultConstrains = {
          audio: true,
          video: true,
        }
        let localVideo = this.$refs.myVideo;
        navigator.mediaDevices.getUserMedia(defaultConstrains)
            .then(stream => {
              console.log(stream)
              this.$store.dispatch("video/setLocalStream",stream);
              localVideo.srcObject = stream;
              localVideo.addEventListener("loadedmetadata",()=>{
                localVideo.play();
              });
            }).catch(err => {
          console.log(err);
        });

      }


    }
  },
  computed:{
    getLocalStream(){
      return this.$store.state.video.localStream;

    }
  },
  data() {
    return {
      items: [
        {item: ["카메라", "카메라 끄기"], icon: ["mdi-camera", "mdi-camera-off"]},
        {item: ["마이크", "마이크 끄기"], icon: ["mdi-camera", "mdi-camera-off"]},
        {item: ["화면공유", "화면공유 종료"], icon: ["mdi-camera", "mdi-camera-off"]},
        {item: ["채팅", ""], icon: ["mdi-camera", "mdi-camera-off"]},
      ],
      defaultItem:[
        ["카메라","mdi-camera"],
        ["마이크","mdi-camera"],
        ["화면공유","mdi-camera"],
        ["채팅","mdi-camera"],
      ],
      cameraStatus:"카메라 끄기",
      cameraIcon:"mdi-camera",
      isOnCamera:true,

      audioStatus:"마이크",
      audioIcon:"mdi-microphone",
      isOnMic:true,

      localStream:""

    }
  }
}
</script>

<style scoped>
.main-grid{
  height: 100%;
  display: grid;
  grid-template-rows: 7fr 1fr;
  grid-template-columns: 1fr;
}
.video-grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr ;
  align-items: stretch;
  gap: 15px 15px;

}
.item{
  width: 100%;
  height: 100%;
  background-color: blue;

}
.video-grid:nth-child(1){
  grid-column: 1 / span 2;
}
video{
}

</style>