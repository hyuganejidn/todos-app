import { observer } from 'mobx-react'
import { ChangeEvent, useState } from 'react'
import { useStore } from '../../store/store'

const initialUser = { name: '', username: '' }

function User() {
  const { userStore } = useStore()
  const [userLogin, setUserLogin] = useState('')
  const [user, setUser] = useState<{ username: string, name: string }>(initialUser)

  const handleChangeInputCreateUser = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleChangeInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserLogin(e.target.value)
  }

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
          userStore.createUser(user.username, user.name)
          setUser(initialUser)
        }}>create User</button>
      </form>
      {!!userStore.users.length && (
        <>
          <h2>List USer</h2>
          <ul>
            {userStore.users.map((user, i) =>
              <li key={i}>
                Name: {user.name} / username: {user.username}
                <br/>
                Task{user.todosCount > 0 && 's'}: {user.todosCount}
              </li>
            )}
          </ul>
        </>
      )}

      {!!userStore.users.length && !userStore.currentUser && (
        <>
          <h1>Login</h1>
          <form action="" autoComplete="off">
            <label htmlFor="userLogin">User name</label>
            <input type="text" name="userLogin" id="userLogin" value={userLogin} onChange={handleChangeInputLogin} />
            <br />
            <button type="button" onClick={() => {
              userStore.login(userLogin)
              setUserLogin('')
            }}>Login</button>
          </form>
        </>
      )}

      {!!userStore.currentUser && (
        <>
          <h3> Current user =&gt; {userStore.currentUser?.name} / {userStore.todosCount} tasks </h3>
          <button type="button" onClick={() => {
            userStore.logout()
          }}>Logout</button>
        </>
      )}
    </div>
  )
}

export default observer(User)