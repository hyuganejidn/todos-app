import { User } from './../user/UserStore';
import { action, computed, makeObservable, observable } from "mobx"
import { RootStore } from "../../store/store"
export class Todo {
  id: number
  title: string
  completed: boolean = false
  author?: User | undefined
  todoStore: TodoStore

  constructor(todoStore: TodoStore, title: string, id: number) {
    this.todoStore = todoStore
    this.id = id
    this.title = title

    makeObservable(this, {
      id: observable,
      title: observable,
      completed: observable,
      author: observable,
      delete: action,
      update: action,
    })
  }

  update(title: string, isCompleted: boolean) {
    this.title = title || this.title
    this.completed = isCompleted
  }

  delete() {
    this.todoStore.removeTodo(this)
  }
}
export class TodoStore {
  rootStore: RootStore
  todos: Todo[] = []

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      todos: observable,

      completedCount: computed,
      totalCount: computed,

      addTodo: action,
      removeTodo: action
    })
  }

  get completedCount() {
    return this.todos.filter(todo => todo.completed).length
  }

  get totalCount() {
    return this.todos.length
  }

  addTodo = (title: string = '', id: number = +Math.random().toFixed(4)) => {
    const todo = new Todo(this, title, id)
    if (this.rootStore.userStore?.currentUser) {
      todo.author = this.rootStore.userStore?.currentUser
    }
    this.todos.push(todo)

  }

  clearTodos() {
    this.todos = []
  }

  removeTodo = (todo: Todo) => {
    this.todos.splice(this.todos.indexOf(todo), 1)
  }
}
