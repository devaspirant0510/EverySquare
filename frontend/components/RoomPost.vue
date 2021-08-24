<template>
  <div>
    <v-card>
      <v-card-title>
        방을 생성하기
      </v-card-title>
      <v-form>
        <v-container>
          <v-text-field
              v-model="inputTitle"
              label="방 제목"/>
          <v-textarea
              v-model="inputDescription"
              label="방설명"/>
          <v-text-field
              v-model="inputMaxUser"
              type="number"
              label="최대 인원수(2~10)"/>
          <v-text-field
              v-model="inputHashTag"
              label="해시태그"/>
          <v-radio-group>
            <v-radio
                label="공개"/>
            <v-radio
                label="비공개"/>
          </v-radio-group>
          <v-btn v-on:click="onClickCreateRoom">
            생성하기
          </v-btn>
          <v-btn to="/rooms/id/asdfasdf">
            돌아가기
          </v-btn>
        </v-container>


      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "frame",
  data() {
    return {
      inputTitle: '',
      inputDescription: '',
      inputMaxUser: '',
      inputHashTag: '',

    }
  },
  methods: {
    async onClickCreateRoom() {
      const result = await this.$store.dispatch("room/create", {
        roomName:this.inputTitle,
        roomDescription:this.inputDescription,
        roomMaxUser:this.inputMaxUser,
        roomHashTag:this.inputHashTag
      });
      console.log(result)
      await this.$router.push("/room?id=adsfklj");
    }
  }
}
</script>

<style scoped>

</style>