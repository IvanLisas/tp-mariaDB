import React, { useEffect, useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { User } from '../../domain/user'
import { userService } from '../../services/userService'
import { SnackbarCustom } from '../snackbar/snackbarCustom'
import { Context } from '../../context/context'
import { Form } from '../form/form'
import './singUp.css'

export const SingUp = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [dni, setDni] = useState('')
  const [date, setDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { updateLoggedUser } = useContext(Context)

  const singUp = async () => {
    if (username !== '' && password !== '' && email !== '' && name !== '' && surname !== '' && dni !== '') {
      try {
        await userService.newUser(new User(username, surname, name, dni, email, password, date))
        updateLoggedUser(await userService.login(username, password))
        props.history.push('/inicio')
      } catch (errorMessage) {
        setErrorMessage('' + errorMessage)
        setSnackbarOpen(true)
      }
    }
    else {
      setErrorMessage('Faltan completar campos')
      setSnackbarOpen(true)
    }
  }

  return (
    <div className='perfil'>
      <div className='perfil-container'>
        <Form
          disabled={false}
          setPassword={setPassword}
          setUsername={setUsername}
          setEmail={setEmail}
          setName={setName}
          setSurname={setSurname}
          setDni={setDni}
          setDate={setDate}
          title="Registrarse"
          botonTitle="Registrarse"
          onClick={singUp}

        ></Form>
        <SnackbarCustom
          setSnackbarOpen={setSnackbarOpen}
          snackbarOpen={snackbarOpen}
          snackbarType='error'
          snackbarMessege={errorMessage}
          snackbarAutoHideDuration={5000}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => singUp()}
        >
          Registrarse
        </Button>

      </div>
    </div>
  )
}

