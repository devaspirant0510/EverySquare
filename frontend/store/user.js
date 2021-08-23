
/*
userId:"",
    userName:"",
    userEmail:"",
    userProfileURL:"",
    createdAt:"",
    userSocketId:"",
*/
export const state = () =>({
    myInfo:null,
});

export const mutations ={
    setUser(state,payload){
        state.myInfo = payload
    },
}
export const actions ={

    checkUser(context,payload){

    },
    login(context,payload){
        // axios 네트워크 작업
        context.commit("setUser",null);
    },
    logout(context,payload){
        context.commit("setUser",null)
    }


}
