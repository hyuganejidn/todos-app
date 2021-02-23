import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { useStore } from '../../store/store'
import { TodosView } from './TodosView'

type TodoListProps = {
  // todosStore: TodosStore
}

const TodoList: React.FC<TodoListProps> = observer(() => {
  const [value, setValue] = useState<string>('')
  const { todoStore } = useStore()

  return (
    <div>
      <input type="text" value={value} onChange={(event) => { setValue(event.target.value) }} />
      <button onClick={() => {
        todoStore.addTodo(value)
        setValue('')
      }}>add Todo</button>
      <TodosView todos={todoStore.todos} />
      <div>Number tasks completed {todoStore.completedCount} /  {todoStore.totalCount} </div>
    </div>
  )
})

export default TodoList