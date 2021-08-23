export const state = ()=>({
    roomList:[]
});

export const mutations = {
    creatRoom(state,payload){
    }
}
export const actions ={
    create(context,payload){
        // 룸생성 네트워크 요청
        // code here....


        context.commit("creatRoom");
    }

}
