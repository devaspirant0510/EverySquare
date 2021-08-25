const common = {};

const convertToJson = (status,message) =>{
    return {
        status,
        message
    }

}
common.convertToJson = convertToJson;

module.exports = common;