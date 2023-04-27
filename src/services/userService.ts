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

   async updateUser(id: string, user: User) {
        try{
            const result = await request.put(`users/${id}`, user)
            console.log(`Usuário atualizado com sucesso!`)
            return result
        }catch(error){
            console.log(`Erro ao atualizar usuário, ${error}`)
        }
    },

    deleteUser(id: string) {
        return request.delete(`users/${id}`).catch((error) => {
            console.log(error);
            alert("Erro ao deletar o usuário");
        })
    }
}