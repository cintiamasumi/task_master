import { Task } from "@/server/db";
interface CreateTaskInput {
    title: string
    description?: string
    due_date: Date
}

export const createTask = async (data: CreateTaskInput) => {
    if(!data.title) {
        throw new Error(' O titulo é obrigatório')
    }
    if(!data.due_date || new Date(data.due_date) < new Date()){
        throw new Error(' A data de vencimento deve ser no futuro')
    }

    const task = await Task.create({
        title: data.title,
        description: data.description || '',
        due_data: data.due_date,
        status: 'Pendente'
    })
    
    return task
}