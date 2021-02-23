import { createContext, useContext } from "react"
import { TodosStore } from "../features/todo/TodoStore"
import { UsersStore } from "../features/user/UserStore"

export interface IStore {
  todosStore: TodosStore
  usersStore: UsersStore
}
// export const rootStore: IStore = {
//   usersStore: new UsersStore(this),
//   todosStore: new TodosStore(this),
// }

export class RootStore {
  todosStore: TodosStore
  usersStore: UsersStore

  constructor() {
    this.usersStore = new UsersStore(this)
    this.todosStore = new TodosStore(this)
  }
}


export const rootStore = new RootStore()

export const StoreContext = createContext(rootStore)

export const useStore = () => useContext(StoreContext)
