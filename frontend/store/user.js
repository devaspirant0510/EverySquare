
/*
userId:"",
    userName:"",
    userEmail:"",
    userProfileURL:"",
    createdAt:"",
    userSocketId:""
*/
import axios from "axios";

export const state = () =>({
    myInfo:null,
    loginCookie:null,
});

export const mutations ={
    setUser(state,payload){
        state.myInfo = payload
    },
    setLoginCookie(state,payload){
        state.loginCookie = payload;
    }

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
    },
    async registerData(context,payload){
        context.commit("setUser",payload)
    },
    async setLoginCookie(context,payload){
        context.commit("setLoginCookie",payload);
    }


}
