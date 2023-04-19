import { createStore } from 'vuex'

export default createStore({
    state: {
        id: localStorage.getItem("id") || null,
        email: localStorage.getItem("email") || null,
        name: null,
        role: localStorage.getItem("role") || null,
        token: null
    },

    getters: {
        getId: (state) => state.id,
        getEmail: (state) => state.email,
        getName: (state) => state.name,
        getRole: (state) => state.role,
        IsAdmin: (state) => state.role === "admin"
    },

    mutations: {
        USER_LOGGED(state, { token }) {
            state.token = token
        },

        USER_LOGOUT(state) {
            state.email = null,
            state.name = null,
            state.role = null,
            state.token = null,
            localStorage.clear()
        },

        setId: (state, value) => (state.id = value),
        setName: (state, value) => (state.name = value),
        setRole: (state, value) => (state.role = value),
        setToken: (state, value) => (state.token = value),
    },

    actions: {

    }
})