export const STATUSES = [
  { id: 'todo', label: 'Pendiente' },
  { id: 'in_progress', label: 'En progreso' },
  { id: 'done', label: 'Completado' },
]

export function addTask(tasks, title) {
  const clean = title.trim()
  if (!clean) return tasks
  return [
    ...tasks,
    { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title: clean, status: 'todo' },
  ]
}

export function editTask(tasks, id, title) {
  const clean = title.trim()
  if (!clean) return tasks
  return tasks.map((t) => (t.id === id ? { ...t, title: clean } : t))
}

export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id)
}

export function moveTask(tasks, id, status) {
  return tasks.map((t) => (t.id === id ? { ...t, status } : t))
}