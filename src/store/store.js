import { createStore } from "vuex";

export default createStore({
    state: {
        quickLaunch : []
    },
    getters: {
        getQuickLaunch: (state) => {
            return state.path
        }
    },
    mutations: {
        setQuickLaunch(state, payload) {
            state.path = payload;
        }
    },
    actions: {
        setQuickLaunchAction: (context, payload) => {
            context.commit('setQuickLaunch', payload)
        }
    }
});