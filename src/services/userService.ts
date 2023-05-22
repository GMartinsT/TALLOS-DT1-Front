import { request } from "@/services/api";
import type User from "@/interface/IUser"
import { POSITION, useToast } from "vue-toastification";

export default {
    async listAll() {
        try {
            return (await request.get("/users")).data
        } catch (error) {
            const toast = useToast()

            toast.error('Erro ao listar usuarios', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
        }

    },

    async createUser(user: User) {
        try {
            const toast = useToast()

            toast.success('Usuário registrado com sucesso!', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
            return await request.post("users/", user)
        } catch (error) {
            console.log(error);
            const toast = useToast()

            toast.error('Erro ao criar usuário', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
        }
    },

    async updateUser(id: string, user: Partial<User>) {
        try {
            const result = await request.patch(`users/${id}`, user)
            console.log(`Usuário atualizado com sucesso!`)
            const toast = useToast()

            toast.success('Usuário atualizado com sucesso!', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
            return result
        } catch (error) {
            console.log(`Erro ao atualizar usuário, ${error}`)
            const toast = useToast()

            toast.error('Erro ao atualizar usuário', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
            return null
        }
    },

    async deleteUser(id: string) {
        try{
            const result = await request.delete(`users/${id}`)
            const toast = useToast()

            toast.success('Usuário deletado com sucesso', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
            return result
        }catch(error){
            console.log(error)
            const toast = useToast()

            toast.error('Erro ao deletar usuario', {
                position: POSITION.TOP_RIGHT,
                timeout: 2000
            })
        }
    }
}