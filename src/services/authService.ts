import { request } from "@/services/api"
import type Login from "@/interface/ILogin"
import { POSITION, useToast } from "vue-toastification"

export default {
    login(login: Login) {
        return request.post('auth/login', login).catch((error) => {
            console.log(error)
            const toast = useToast()

            toast.error('Login inválido', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
        })
    }
}