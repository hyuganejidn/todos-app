import { observer } from 'mobx-react'
import React from 'react'
import { Todo } from './TodoStore'

type TodoViewProps = {
  todo: Todo
}

export const TodoView: React.FC<TodoViewProps> = observer(({ todo }) => {
  return (
    <li>
      <span onClick={() => { todo.delete() }} style={{ color: '#f00' }}> x </span>
      <span>{todo.title}</span>
      <input type="checkbox" checked={todo.completed} onChange={e => todo.update('', e.target.checked)} />
      {todo.author && <span>Create By: {todo.author?.name}</span>}
    </li>
  )
})