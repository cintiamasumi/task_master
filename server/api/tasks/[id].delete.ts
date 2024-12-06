import { deleteTask } from '@/server/useCase/tasks/delete-task';
import { defineEventHandler, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id) {
      setResponseStatus(event, 400); 
      return { error: 'O ID é obrigatório' };
    }

    const result = await deleteTask({ id: parseInt(id) });

    setResponseStatus(event, 200); 
    return result;
  } catch (error) {
    if (error instanceof Error) {
      setResponseStatus(event, 404); 
      return { error: error.message };
    }

    setResponseStatus(event, 500); 
    return { error: 'Unknown error occurred' };
  }
});
