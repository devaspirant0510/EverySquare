export const state = () =>({
    localStream:""
});

export const mutations = {
    setLocalStream(state,payload){
        state.localStream=  payload;

    }


};

export const actions = {
    async setLocalStream(context,payload){
        context.commit("setLocalStream",payload)


    }

}