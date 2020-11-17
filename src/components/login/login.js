import './login.css'
import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { SnackbarCustom } from '../snackbar/snackbarCustom'
import { testService } from '../../services/testService'
import { userService } from '../../services/userService'
import Link from '@material-ui/core/Link'

export const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { updateLoggedUser } = useContext(Context)
  const [errorMessage, setErrorMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  // const [test, setTest] = useState('')
  // useEffect(async () => setTest(await testService.testCall()), [])

  const login = async () => {
    try {
      updateLoggedUser(await userService.login(username, password))
      props.history.push('/inicio')
    } catch (errorMessage) {
      setErrorMessage('Usuario o contraseña incorrecto ' + errorMessage)
      setSnackbarOpen(true)
    }
  }

  return (
    <div className="login">
      <div className="background-login"></div>
      <div className="login-container">
        <div className='logo-container'>
          <span className="material-icons" id='logo'>
            storage
          </span>
          Maria DB

        </div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="user"
          label="Usuario"
          name="user"
          autoFocus
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* <Button icon={passwordIconEye()} onClick={() => setshowPassword(!showPassword)} /> */}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recordar contraseña"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => login()}
        >
          Ingresar
        </Button>
        <Link className="link" href="#" variant="body2">
          {'No tienes cuenta? Registrate aqui'}
        </Link>
        {/* {test} */}
      </div>
      <SnackbarCustom
        setSnackbarOpen={setSnackbarOpen}
        snackbarOpen={snackbarOpen}
        snackbarType='error'
        snackbarMessege={errorMessage}
        snackbarAutoHideDuration={5000}
      />

    </div>
  )
}