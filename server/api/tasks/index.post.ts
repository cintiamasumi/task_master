import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { createTask } from '@/server/useCase/tasks/create-task';

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event)
  console.log(body)
  try {
    
    const task = await createTask(body)  
    console.log(task)
    setResponseStatus(event,201)
    return { status: 'Task created', task }
  } catch (error) {

    if( error instanceof Error){
      setResponseStatus(event,400)
        return { error: error.message }
    }
    setResponseStatus(event,500)
    return {error: 'Unkown error occurred'}
  }
})