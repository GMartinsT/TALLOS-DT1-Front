import { request } from "@/services/api";
import type User from "@/interface/IUser"

export default {
    async listAll() {
        try {
            return (await request.get("/users")).data
        } catch (error) {
            alert("Erro ao listar usuarios");
        }

    },

    async createUser(user: User) {
        try {
            alert("Usuário registrado com sucesso")
            return await request.post("users/", user)
        } catch (error) {
            console.log(error);
            alert("Erro ao criar usuário");
        }
    },

    async updateUser(id: string, user: User) {
        try {
            const result = await request.patch(`users/${id}`, user)
            console.log(`Usuário atualizado com sucesso!`)
            return result
        } catch (error) {
            console.log(`Erro ao atualizar usuário, ${error}`)
        }
    },

    deleteUser(id: string) {
        try{
            return request.delete(`users/${id}`)

        }catch(error){
            console.log(error)
                alert("Erro ao deletar o usuário");
        }
    }
}