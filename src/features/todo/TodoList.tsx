import { autorun, reaction } from 'mobx'
import { disposeOnUnmount, observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../store/store'
import { TodosView } from './TodosView'

type TodoListProps = {
  // todosStore: TodosStore
}

const TodoList: React.FC<TodoListProps> = observer(() => {
  const [value, setValue] = useState<string>('')
  const { todosStore } = useStore()

  return (
    <div>
      <input type="text" value={value} onChange={(event) => { setValue(event.target.value) }} />
      <button onClick={() => {
        todosStore.addTodo(value)
        setValue('')
      }}>add Todo</button>
      <TodosView todosStore={todosStore} />
      <div>Number tasks completed {todosStore.completedCount} /  {todosStore.totalCount} </div>
    </div>
  )
})

export default TodoList