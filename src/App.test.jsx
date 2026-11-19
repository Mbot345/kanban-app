import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, expect } from 'vitest'
import App from './App'

it('agrega una tarea desde el formulario', async () => {
  render(<App />)
  await userEvent.type(screen.getByPlaceholderText('Nueva tarea...'), 'Billing integration')
  await userEvent.click(screen.getByRole('button', { name: /agregar/i }))
  expect(screen.getByText('Billing integration')).toBeInTheDocument()
})