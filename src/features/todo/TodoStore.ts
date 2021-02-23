import { action, computed, makeObservable, observable } from "mobx"
import { IStore, RootStore } from "../../store/store"
import { IUser } from "../user/UserStore"

export interface ITodo {
  id: number
  title: string
  completed: boolean
  author?: IUser
}

export class TodosStore {
  rootStore: RootStore
  todos: ITodo[] = []

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      todos: observable,

      completedCount: computed,
      totalCount: computed,

      addTodo: action,
      toggleCompleteTodo: action.bound,
      removeTodo: action
    })
  }



  get completedCount() {
    return this.todos.filter(todo => todo.completed).length
  }

  get totalCount() {
    return this.todos.length
  }

  addTodo = (title: string) => {
    const todo: ITodo = {
      title,
      id: +Math.random().toFixed(4),
      completed: false
    }
    if (this.rootStore.usersStore?.currentUser) {
      todo.author = this.rootStore.usersStore?.currentUser
    }
    this.todos.push(todo)
  }

  toggleCompleteTodo = (id: number) => {
    const todoIndex = this.todos.findIndex(todo => todo.id === id)
    if (!!~todoIndex)
      this.todos[todoIndex].completed = !this.todos[todoIndex].completed
  }

  clearTodos() {
    this.todos = []
  }

  removeTodo = (id: number) => {
    const todoIndex = this.todos.findIndex(todo => todo.id === id)
    this.todos.splice(todoIndex, 1)
  }
}
// const todosStore = new TodosStore(this)
// export { todosStore }