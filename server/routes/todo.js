import express from 'express'
import * as db from '../db/db'

const router = express.Router()

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await db.getAllTodos()
    res.json(todos)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.post('/', async (req, res) => {
  try {
    const todo = req.body
    const todos = await db.insertTodo(todo)
    res.json(todos)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.patch('/', async (req, res) => {
  try {
    const id = req.body.id
    const todo = req.body
    const test = await db.updateTodo(id, todo)
    res.json(test)
  } catch (error) {
    res.status(500).json(error)
  }
})
router.delete('/', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteTodo(id)
    res.status(202).send('Delete Success')
  } catch (error) {
    res.status(500).send('Database Error on deleteTodo')
  }
})
export default router
