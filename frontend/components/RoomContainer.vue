<template>
  <v-card>
    <v-card-title>
      {{cardTitle}}
    </v-card-title>
    <v-card-subtitle>
      {{cardSubTitle}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      cardTitle:"",
      cardSubTitle:""
    }
  }
}
</script>

<style scoped>

</style>