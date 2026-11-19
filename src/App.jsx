import { useState } from 'react'
import { STATUSES, addTask, editTask, deleteTask, moveTask } from './tasks'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    setTasks(addTask(tasks, title))
    setTitle('')
  }

  const startEdit = (t) => {
    setEditingId(t.id)
    setEditText(t.title)
  }

  const saveEdit = (id) => {
    setTasks(editTask(tasks, id, editText))
    setEditingId(null)
  }

  return (
    <div className="app">
      <h1>Kanban board</h1>

      <form onSubmit={handleAdd} className="add-form">
        <input
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="board">
        {STATUSES.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id)
          return (
            <section key={col.id} className="column">
              <h2>{col.label} {colTasks.length}</h2>

              {colTasks.map((t) => (
                <article key={t.id} className="card">
                  {editingId === t.id ? (
                    <>
                      <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                      <button onClick={() => saveEdit(t.id)}>Guardar</button>
                    </>
                  ) : (
                    <p>{t.title}</p>
                  )}

                  <div className="actions">
                    <select
                      aria-label={`Estado de ${t.title}`}
                      value={t.status}
                      onChange={(e) => setTasks(moveTask(tasks, t.id, e.target.value))}
                    >
                      {STATUSES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                    <button onClick={() => startEdit(t)}>Editar</button>
                    <button onClick={() => setTasks(deleteTask(tasks, t.id))}>Eliminar</button>
                  </div>
                </article>
              ))}
              {colTasks.length === 0 && <p className="empty">Sin tareas</p>}
            </section>
          )
        })}
      </div>
    </div>
  )
}