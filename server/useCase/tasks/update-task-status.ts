import { Task } from "@/server/db";

interface UpdateTaskStatusInput {
    id: number
    status: string
}

export const updateTaskInput = async (data: UpdateTaskStatusInput) => {
    const validStatus = ['Pendente', 'Concluida']

    if(!validStatus.includes(data.status)) {
        throw new Error(`Status invalido. Aceito apenas ${validStatus}`)
    }

    const task = await Task.findByPk(data.id)

    if(!task) {
        throw new Error('Tarefa não encontrada.')
    }

    
    await task.update({status: data.status},{
        where: {
            id: data.id
        }
    })
    return task
}