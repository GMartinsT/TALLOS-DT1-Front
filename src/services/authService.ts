import { request } from "@/api"
import type Login from "@/interface/ILogin"

export default {
    login(login: Login) {
        console.log("logReq", request)
        return request.post('auth/login', login).catch((error) => {
            console.log(error)
            alert("Login inválido")
        })
    }
}