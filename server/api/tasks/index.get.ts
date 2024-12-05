import { defineEventHandler, setResponseStatus } from 'h3'
import Task from '../../db/models/task'

export default defineEventHandler(async (event) => {
  try {
    const tasks = await Task.findAll()
    setResponseStatus(event,200)
    return { tasks }
  } catch (error) {
    if( error instanceof Error){
      setResponseStatus(event,400)
        return { error: error.message }
    }
    setResponseStatus(event,400)
    return {error: 'Unkown error occurred'}
  }
})