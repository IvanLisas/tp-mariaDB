import './login.css'
import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import { testService } from '../../services/testService'
import Link from '@material-ui/core/Link'


export const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [test, setTest] = useState('')

  useEffect(async () => setTest(await testService.testCall()), [])

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
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
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
          color="primary">
          Ingresar
        </Button>
        <Link className="link" href="#" variant="body2">
          {'No tienes cuenta? Registrate aqui'}
        </Link>
        {/* {test} */}
      </div>


    </div>
  )
}