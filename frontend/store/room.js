import axios from "axios";

export const state = ()=>({
    roomList:[]
});

export const mutations = {
    creatRoom(state,payload){
        state.roomList.push(payload)
    }
}
export const actions ={
    async create(context,payload){
        // 룸생성 네트워크 요청
        // code here....
        this.$axios
        const result = await axios.post("https://www.127.0.0.1:8081/room",payload);
        console.log(result)



        context.commit("creatRoom",payload);
    },
    async select(context,payload){
        const result = await axios.get("https://ec2-3-35-53-220.ap-northeast-2.compute.amazonaws.com/room");
        console.log(result)

    },
    async loadRoom(context,payload){
        const result = await axios.get("http://127.0.0.1:8081/room",{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie':`user=${payload}`
            },
            withCredentials:true,
        })
        console.log(result);
    }

}
