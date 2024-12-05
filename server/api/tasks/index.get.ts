import { defineEventHandler } from 'h3'
import Task from '../../db/models/task'

export default defineEventHandler(async () => {
  try {
    const tasks = await Task.findAll()
    return { tasks }
  } catch (error) {
    if( error instanceof Error){
        return { error: error.message }
    }
    return {error: 'Unkown error occurred'}
  }
})