const common = {};

const convertToJson = (status,message,data) =>{
    console.log(status)
    console.log(message)
    console.log(data)
    let messageL = {
        status,
        message,
        data
    }
    console.log(messageL);
    return messageL;

}
common.convertToJson = convertToJson;

module.exports = common;