import { createContext, useContext } from "react"
import { TodoStore } from "../features/todo/TodoStore"
import { UserStore } from "../features/user/UserStore"

export interface IStore {
  todoStore: TodoStore
  userStore: UserStore
}
// export const rootStore: IStore = {
//   usersStore: new UsersStore(this),
//   todosStore: new TodosStore(this),
// }

export class RootStore {
  todoStore: TodoStore
  userStore: UserStore

  constructor() {
    this.userStore = new UserStore(this)
    this.todoStore = new TodoStore(this)
  }
}


export const rootStore = new RootStore()

export const StoreContext = createContext(rootStore)

export const useStore = () => useContext(StoreContext)
