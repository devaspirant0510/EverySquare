// 표준 json 형태로 바꿔주는 함수
const convertToJson = (status,message,data) =>{
    let messageL = {
        status,
        message,
        data
    }
    return messageL;
}
// 쿠키키로 세션 벨류에 접근
const getSessionValue = (req,cookieKey) =>{
    const ckey = req.signedCookies[cookieKey];
    return req.session[ckey];
}
const setSessionValue = (req,cookieKey,val)=>{
    const ckey = req.signedCookies[cookieKey];
    req.session[ckey] = val;
}

module.exports = {
    convertToJson,
    getSessionValue,
    setSessionValue
};