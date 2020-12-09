import './editarPerfil.css'
import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { userService } from '../../../services/userService'
import { Context } from '../../../context/context'
import { User } from '../../../domain/user'

export const EditarPerfil = (props) => {
  const { loggedUser } = useContext(Context)
  const { updateLoggedUser } = useContext(Context)


  const [username, setUsername] = useState(loggedUser.username)

  const [email, setEmail] = useState(loggedUser.email)
  const [name, setName] = useState(loggedUser.name)
  const [surname, setSurname] = useState(loggedUser.surname)
  const [dni, setDni] = useState(loggedUser.dni)

  const volver = () => props.history.goBack()

  const editarPerfil = async () => {

    const updatedUser = new User(username, surname, name, dni, email)
    console.log(updatedUser)
    try {

      updateLoggedUser(await userService.updateUser(loggedUser.id, updatedUser))
      volver()
    }
    catch (message) { console.log(message) }

  }


  return (
    <div className='editar-perfil'>
      <div className='editar-perfil-container'>

        <div className='titulo-container'>
          Editar informacion personal
        </div>
        <div className='informacion-container'>
          <TextField
            defaultValue={loggedUser.username}
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Usuario"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            defaultValue={loggedUser.email}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            disable
          />
          <TextField
            defaultValue={loggedUser.dni}
            variant="outlined"
            required
            fullWidth
            id="dni"
            label="DNI"
            name="dni"
            type='number'
            onChange={(event) => setDni(event.target.value)}

          />
          <TextField
            defaultValue={loggedUser.name}
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Nombre"
            autoFocus
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            defaultValue={loggedUser.surname}
            variant="outlined"
            required
            fullWidth
            id="surname"
            label="Apellido"
            name="surname"
            onChange={(event) => setSurname(event.target.value)}
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
            onClick={() => editarPerfil()}
          >
            Aceptar
          </Button>

        </div>
      </div>

    </div>

  )
}


