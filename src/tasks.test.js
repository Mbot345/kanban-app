import { describe, it, expect } from 'vitest'
import { addTask, editTask, deleteTask, moveTask } from './tasks'

describe('lógica del Kanban', () => {
  it('crea una tarea en estado Pendiente', () => {
    const result = addTask([], 'Login page')
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('todo')
  })

  it('edita el título de una tarea', () => {
    const [task] = addTask([], 'Viejo')
    const result = editTask([task], task.id, 'Nuevo')
    expect(result[0].title).toBe('Nuevo')
  })

  it('elimina una tarea', () => {
    const [task] = addTask([], 'Borrar')
    expect(deleteTask([task], task.id)).toHaveLength(0)
  })

  it('cambia el estado de una tarea', () => {
    const [task] = addTask([], 'Mover')
    const result = moveTask([task], task.id, 'in_progress')
    expect(result[0].status).toBe('in_progress')
  })
})