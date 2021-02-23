import { observer } from 'mobx-react'
import React from 'react'
import { ITodo } from './TodoStore'

type TodoViewProps = {
  todo: ITodo
  removeTodo: (id: number) => void
  toggleCompleteTodo: (id: number) => void
}

export const TodoView: React.FC<TodoViewProps> = observer(({ todo, removeTodo, toggleCompleteTodo }) => {
  return (
    <li>
      <span onClick={() => { removeTodo(todo.id) }} style={{ color: '#f00' }}> x </span>
      <span>{todo.title}</span>
      <input type="checkbox" checked={todo.completed} onChange={_ => toggleCompleteTodo(todo.id)} />
      {todo.author && <span>Create By: {todo.author?.name}</span>}
    </li>
  )
})