<template>

</template>

<script>
export default {
  name: "login_callback_kakao",
  mounted() {
    console.log(this.$route.query.code);
    const qs = require('qs');
    let accessToken = null
    const parameter = {
      grant_type: 'authorization_code',
      client_id: '064e7adfbf5f09667f51259dd2ec3890',
      code: this.$route.query.code
    }
    this.$axios
        .post('https://kauth.kakao.com/oauth/token', qs.stringify(parameter), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
        .then((res) => {
          accessToken = res.data.access_token
          this.$router.push({
            name: 'login',
            params: {
              accessToken
            }
          })
        });
  }
}
</script>

<style scoped>

</style>