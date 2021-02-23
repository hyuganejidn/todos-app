import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import React, { ChangeEvent, useState } from 'react'
import { useStore } from '../../store/store'

const initialUser = { name: '', username: '', isLogin: false }

// autorun(() => {
//   console.log("Energy level:")
// })


function User() {
  const { usersStore, todosStore } = useStore()
  const [userLogin, setUserLogin] = useState('')
  const [user, setUser] = useState(initialUser)
  const [countTodoUsers, setCountTodoUsers] = useState({})

  const handleChangeInputCreateUser = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleChangeInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserLogin(e.target.value)
  }


  reaction(() => {
    return todosStore.todos
  }, (todos) => {
    console.log(todos, 'todos')
    // const
  })

  return (
    <div>
      <form action="" autoComplete="off">
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username" value={user.username} onChange={handleChangeInputCreateUser} />
        <br />
        <label htmlFor="name">Full name</label>
        <input type="text" name="name" id="name" value={user.name} onChange={handleChangeInputCreateUser} />
        <br />
        <button type="button" onClick={() => {
          usersStore.createUser(user)
          setUser(initialUser)
        }}>create User</button>
      </form>
      {!!usersStore.users.length && (
        <>
          <h2>List USer</h2>
          <ul>
            {usersStore.users.map((user, i) =>
              <li key={i}>{user.name}/ {user.username}</li>
            )}
          </ul>
        </>
      )}

      {!!usersStore.users.length && !usersStore.currentUser && (
        <>
          <h1>Login</h1>
          <form action="" autoComplete="off">
            <label htmlFor="userLogin">User name</label>
            <input type="text" name="userLogin" id="userLogin" value={userLogin} onChange={handleChangeInputLogin} />
            <br />
            <button type="button" onClick={() => {
              usersStore.login(userLogin)
              setUserLogin('')
            }}>Login</button>
          </form>
        </>
      )}

      {!!usersStore.currentUser?.name && (
        <>
          <h3> Current user &gt; {usersStore.currentUser?.name}</h3>
          <div>Number tasks {usersStore.taskOfCurrentUserCount}</div>
          <button type="button" onClick={() => {
            usersStore.logout()
          }}>Logout</button>
        </>
      )}
    </div>
  )
}

export default observer(User)