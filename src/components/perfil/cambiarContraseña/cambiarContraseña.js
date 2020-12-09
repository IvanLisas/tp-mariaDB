import './cambiarContraseña.css'
import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { userService } from '../../../services/userService'
import { Context } from '../../../context/context'
import { SnackbarCustom } from '../../snackbar/snackbarCustom'

export const CambiarContraseña = (props) => {
  const { loggedUser } = useContext(Context)

  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const volver = () => props.history.goBack()

  const editarPassword = async () => {

    try {
      console.log(!newPassword, oldPassword, repeatNewPassword)
      if (newPassword !== '' && oldPassword !== '' && repeatNewPassword !== '') {
        if (newPassword === repeatNewPassword) {
          await userService.updatePassword(loggedUser.id, oldPassword, newPassword)
          volver()
        }
        else {
          setErrorMessage('Las cotraseñas no coinciden')
          setSnackbarOpen(true)
        }
      }
      else {
        setErrorMessage('Faltan llenar campos')
        setSnackbarOpen(true)
      }
    }
    catch (errorMessage) {
      setErrorMessage('La contraseña actual es incorrecta')
      setSnackbarOpen(true)
    }

  }


  return (
    <div className='editar-perfil'>
      <div className='editar-perfil-container'>

        <div className='titulo-container'>
          Cambiar contraseña
        </div>
        <div className='informacion-container'>
          <TextField
            name="oldPassword"
            variant="outlined"
            required
            fullWidth
            id="oldPassword"
            label="Contraseña actual"
            type='password'
            onChange={(event) => setOldPassword(event.target.value)}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            id="newPassword"
            label="Nueva contraseña"
            name="newPassword"
            onChange={(event) => setNewPassword(event.target.value)}
            type='password'
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="repeatNewPassword"
            label="Repita la nueva contraseña"
            name="repeatNewPassword"
            onChange={(event) => setRepeatNewPassword(event.target.value)}
            type='password'
          />

        </div>
        <div className="button-container">
          <Button
            variant="contained"
            color="seconday"
            onClick={() => volver()}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => editarPassword()}
          >
            Aceptar
          </Button>

        </div>
        <SnackbarCustom
          setSnackbarOpen={setSnackbarOpen}
          snackbarOpen={snackbarOpen}
          snackbarType='error'
          snackbarMessege={errorMessage}
          snackbarAutoHideDuration={5000}
        />
      </div>

    </div>

  )
}


