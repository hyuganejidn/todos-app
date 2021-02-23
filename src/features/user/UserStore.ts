import { action, computed, makeObservable, observable } from "mobx"
import { RootStore } from './../../store/store'

export class User {
  id: number
  username: string
  name: string
  userStore: UserStore

  constructor(
    userStore: UserStore,
    username: string,
    name: string,
    id = +Math.random().toFixed(4)
  ) {
    this.userStore = userStore
    this.id = id
    this.username = username
    this.name = name

    makeObservable(this, {
      id: observable,
      username: observable,
      name: observable,

      todos: computed,
      todosCount: computed,
    })
  }

  get todos() {
    return this.userStore.rootStore?.todoStore?.todos.filter(todo => todo.author?.id === this.id)
  }

  get todosCount() {
    return this.todos?.length
  }
}

export class UserStore {
  rootStore: RootStore
  users: User[] = []
  currentUser: User | undefined = undefined

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      users: observable,
      currentUser: observable,

      todos: computed,
      todosCount: computed,

      createUser: action,
      login: action,
      logout: action
    })
  }

  get todos() {
    return this.currentUser?.todos
  }

  get todosCount() {
    return this.currentUser?.todos.length
  }

  createUser(username: string, name: string) {
    const user = new User(this, username, name)
    this.users.push(user)
  }

  login(username: string) {
    const user = this.users.find(user => user.username === username)
    this.currentUser = user
  }

  logout() {
    this.currentUser = undefined
  }
}
