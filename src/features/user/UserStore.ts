import { action, computed, makeObservable, observable } from "mobx";
import { ITodo } from "../todo/TodoStore";
import { IStore, RootStore } from './../../store/store';

export interface IUser {
  username: string
  name: string
  isLogin: boolean
}

export class UsersStore {
  rootStore: RootStore
  users: IUser[] = []

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      users: observable,
      currentUser: computed,
      taskOfCurrentUserCount: computed,
      createUser: action,
      login: action,
      logout: action
    })
  }

  get currentUser() {
    const user = this.users.find(user => user.isLogin)
    return user
  }

  get taskOfCurrentUserCount() {
    return this.rootStore.todosStore.todos.filter(todo => todo.author?.name === this.currentUser?.name).length
  }

  createUser(user: IUser) {
    this.users.push(user);
  }

  login(username: string) {
    const userIndex = this.users.findIndex(user => user.username === username)
    if (~userIndex) {
      this.users[userIndex].isLogin = true
    }
  }

  logout() {
    const userIndex = this.users.findIndex(user => user.isLogin)
    if (~userIndex) {
      this.users[userIndex].isLogin = false
    }
  }
}
