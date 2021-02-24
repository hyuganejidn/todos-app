import { observer } from 'mobx-react'
import React from 'react'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup';

import { useStore } from '../../store/store'
import { TodosView } from './TodosView'
import InputEmoji from '../../components/form/InputEmoji';

type TodoListProps = {
  // todosStore: TodosStore
}

const TodoList: React.FC<TodoListProps> = observer(() => {
  const { todoStore } = useStore()

  const validationSchema = Yup.object({
    task: Yup.string().required('This field is required'),
  })

  return (
    <div>
      <Formik
        initialValues={{ task: '' }}
        onSubmit={(values, actions) => {
          todoStore.addTodo(values.task)
          actions.resetForm()
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          console.log(formikProps)
          return (
            <Form>
              <FastField
                name='task'
                component={InputEmoji}

                label="Task"
                placeholder="todo ..."
              />
              <button type="submit">Add todo</button>
            </Form>
          )
        }}
      </Formik>
      <TodosView todos={todoStore.todos} />
      <div>Number tasks completed {todoStore.completedCount} /  {todoStore.totalCount} </div>
    </div>
  )
})

export default TodoList