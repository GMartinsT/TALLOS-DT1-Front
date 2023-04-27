import { createStore } from 'vuex'

export default createStore({
    state: {
        id: localStorage.getItem("id") || null,
        email: localStorage.getItem("email") || null,
        name: null,
        role: localStorage.getItem("role") || null,
        token: localStorage.getItem("token") || ""
        },

    getters: {
        getId: (state) => state.id,
        getEmail: (state) => state.email,
        getName: (state) => state.name,
        getRole: (state) => state.role,
        IsAdmin: (state) => state.role === "admin",
        sessionId: (state)=> state.email
    },

    mutations: {
        USER_LOGGED(state, { token }) {
            state.token = token
        },

        USER_LOGOUT(state) {
            state.email = null,
            state.name = null,
            state.role = null,
            state.token = "",
            localStorage.clear()
        },

        setId: (state, value) => (state.email = value),
        setName: (state, value) => (state.name = value),
        setRole: (state, value) => (state.role = value),
        setToken: (state, value) => (state.token = value),
        setSession: (state, value) =>(state.email = value)
    },

    actions: {

    }
})