import { Task } from "@/server/db";

interface DeleteTask {
    id:number
}

export const deleteTask = async (data: DeleteTask) => {

    const task = await Task.findByPk(data.id)
    if(!task) {
        throw new Error('Tarefa não encontrada')
    }

    await task.update({deleted_at: new Date()}, {where: {
        id: data.id
    }})

    return {message: 'Tarefa marcada como excluida'}

}