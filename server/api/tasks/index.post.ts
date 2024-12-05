import { defineEventHandler, readBody } from 'h3';
import Task from '../../db/models/task';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const task = await Task.create(body);
    return { status: 'Task created', task }
  } catch (error) {

    if( error instanceof Error){
        return { error: error.message }
    }
    return {error: 'Unkown error occurred'}
  }
})