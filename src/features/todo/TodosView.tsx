import { observer } from 'mobx-react'
import React from 'react'
import { Todo } from './TodoStore'
import { TodoView } from './TodoView'

type TodosViewProps = {
  todos: Todo[]
}

export const TodosView: React.FC<TodosViewProps> = observer(({ todos }) => {
  return (
    <ul>
      {todos.map((todo: Todo) =>  <TodoView key={todo.id} todo={todo} />)}
    </ul>
  )
})