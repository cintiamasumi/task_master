import { updateTaskInput } from '@/server/useCase/tasks/update-task-status';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
    try {
      const body = await readBody(event);
  
      if (!body.id || !body.status) {
        setResponseStatus(event, 400); 
        return { error: 'O ID e o status são obrigatórios' };
      }
  
      const task = await updateTaskInput({ id: body.id, status: body.status });
  
      setResponseStatus(event, 200);
      return { status: 'Task updated', task };
    } catch (error) {
      if (error instanceof Error) {
        setResponseStatus(event, 400); 
        return { error: error.message };
      }
  
      setResponseStatus(event, 500);
      return { error: 'Unknown error occurred' };
    }
  })