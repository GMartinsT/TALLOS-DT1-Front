import { request } from "@/services/api";
import type User from "@/interface/IUser"

export default {
    listAll() {
        return request.get("/users").catch((error) => {
            console.log(error)
            alert("Erro ao listar usuarios");
        })
    },

    createUser(user: User): any {
        return request.post("users/", user).catch((error) => {
            console.log(error);
            alert("Erro ao criar usuário");
        })
    },

    updateUser(id: string, user: User) {
        return request.put(`users/${id}`, user).catch((error) => {
            console.log(error);
            alert("Erro ao atualizar usuário");
        })
    },

    deleteUser(id: string) {
        return request.delete(`users/${id}`).catch((error) => {
            console.log(error);
            alert("Erro ao deletar o usuário");
        })
    }
}