import { FastField, Formik, Form } from 'formik'
import { observer } from 'mobx-react'
import { ChangeEvent, useState } from 'react'
import { useStore } from '../../store/store'
import InputField from '../../components/form/InputField'
import * as Yup from 'yup';

const initialUser = { name: '', username: '' }

export interface FormUserValues {
  name: string;
  username: string;
}

function User() {
  const { userStore } = useStore()
  const [userLogin, setUserLogin] = useState('')

  const handleChangeInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserLogin(e.target.value)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),

    username: Yup.string().required('This field is required')
  })

  console.log(Yup)
  return (
    <div>
      <Formik
        initialValues={initialUser}
        onSubmit={(values, actions) => {
          userStore.createUser(values.username, values.name)
          actions.resetForm()
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          // const { values, errors, touched } = formikProps
          console.log(formikProps)
          return (
            <Form>
              <FastField
                name='username'
                component={InputField}

                label="User name"
                placeholder="username"
              />

              <FastField
                name='name'
                component={InputField}

                label="Name"
                placeholder="name"
              />
              <button type="submit">create</button>
            </Form>
          )
        }}
      </Formik>
      {!!userStore.users.length && (
        <>
          <h2>List USer</h2>
          <ul>
            {userStore.users.map((user, i) =>
              <li key={i}>
                Name: {user.name} / username: {user.username}
                <br />
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