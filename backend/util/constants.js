const host = process.env.SERVER_ENV==="local"?"http://127.0.0.1:8081":"https://www.every-square.shop";
console.log(`${host} asdfasdfasdfasdfasdfasfd`)
module.exports = {
    defaultProfileURL:`${host}/user/file/default_profile.png`
}