import './miperfil.css'
import React, { useEffect, useState, useContext } from 'react'
import { FormLabel, MenuItem, Select, Snackbar, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import { Context } from '../../context/context'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Form } from '../form/form'
import { userService } from '../../services/userService'
import { User } from '../../domain/user'
import { SnackbarCustom } from '../snackbar/snackbarCustom'

export const Miperfil = (props) => {
  const { loggedUser } = useContext(Context)
  const [username, setUsername] = useState(loggedUser.username)
  const [password, setPassword] = useState(loggedUser.password)
  const [email, setEmail] = useState(loggedUser.email)
  const [name, setName] = useState(loggedUser.name)
  const [surname, setSurname] = useState(loggedUser.surname)
  const [dni, setDni] = useState(loggedUser.dni)
  const [date, setDate] = useState(loggedUser.date)
  const [errorMessage, setErrorMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { updateLoggedUser } = useContext(Context)
  const [noEditable, setNoEditable] = useState(true)

  const volver = () => props.history.push('/inicio')

  const cambiarEditar = () => setNoEditable(!noEditable)

  const editarPerfil = async () => {
    await userService.updateUser(new User(loggedUser.username, surname, name, dni, email, password, date))
    setErrorMessage('Usario actualizado con exito')
    setSnackbarOpen(true)
    setNoEditable(true)
  }


  const borrarPerfil = async () => {
    await userService.deleteUser(loggedUser)
    updateLoggedUser(undefined)
    props.history.push('/login')

  }

  return (
    <div className='perfil'>
      <div className='perfil-container'>
        <Form

          username={loggedUser.username}
          surname={loggedUser.surname}
          email={loggedUser.email}
          dni={loggedUser.dni}
          date={loggedUser.date}
          name={loggedUser.name}
          miPerfil={true}
          disabled={noEditable}
          setPassword={setPassword}
          setEmail={setEmail}
          setName={setName}
          setSurname={setSurname}
          setDni={setDni}
          setDate={setDate}
          title={loggedUser.username}
          botonTitle="Editar"
          onClick={cambiarEditar}
        ></Form>
        <div className="boton-container">
          {noEditable && <div className="boton">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => cambiarEditar()}
            >
              Editar
            </Button>
          </div>}
          {!noEditable && <div className="boton">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => editarPerfil()}
            >
              Aceptar
            </Button>
          </div>}
          {!noEditable && <div className="boton">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => cambiarEditar()}
            >
              Cancelar
            </Button>
          </div>}

        </div>
        {!noEditable && <div className="boton-borrar">
          <Button
            fullWidth
            variant="contained"
            color="seconday"
            onClick={() => borrarPerfil()}
          >
            Borrar
            </Button>
          <SnackbarCustom
            setSnackbarOpen={setSnackbarOpen}
            snackbarOpen={snackbarOpen}
            snackbarType='success'
            snackbarMessege={errorMessage}
            snackbarAutoHideDuration={5000}
          />
        </div>}
      </div>
    </div>
  )
}

