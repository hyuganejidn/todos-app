import { observer } from 'mobx-react'
import React from 'react'
import { ITodo, TodosStore } from './TodoStore'
import { TodoView } from './TodoView'

type TodosViewProps = {
  todosStore: TodosStore
}

export const TodosView: React.FC<TodosViewProps> = observer(({ todosStore: { todos, removeTodo, toggleCompleteTodo } }) => {
  return (
    <ul>
      {todos.map((todo: ITodo) => {
        return (
          <TodoView
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleCompleteTodo={toggleCompleteTodo} />
        )
      })}
    </ul>
  )
})