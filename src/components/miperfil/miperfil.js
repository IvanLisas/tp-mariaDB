import './miperfil.css'
import React, { useEffect, useState, useContext } from 'react'
import { FormLabel, MenuItem, Select, Snackbar, TextField } from '@material-ui/core'
import { Button } from 'primereact/button'
import CardContent from '@material-ui/core/CardContent'
import { Context } from '../../context/context'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export const Miperfil = (props) => {
  const { loggedUser } = useContext(Context)

  const volver = () => props.history.push('/inicio')

  return (
    <div className="perfil">
      <div className="perfil-container">
        <div className="tittle" >
          <AccountCircleIcon id='icon-profile' />
        Mi Perfil </div>
        <div class="datos-container">
          {console.log(loggedUser)}
          <TextField disabled id="usuario_form" label="Usuario" variant="outlined" defaultValue={loggedUser.username} />
          <TextField disabled id="nombre_form" label="Nombre" variant="outlined" defaultValue={loggedUser.name} />
          <TextField disabled id="apellido_form" label="Apellido" variant="outlined" defaultValue={loggedUser.surname} />
          <TextField disabled id="dni_form" label="DNI" type='number' variant="outlined" defaultValue={loggedUser.dni} />
          <TextField
            disabled
            variant="outlined"
            id="date_form"
            label="Fecha de nacimiento"
            type="date"
            defaultValue="1995-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField defaultValue={loggedUser.email} disabled variant="outlined" id="email_form" label="Email" type='mail' />
        </div>
        <div className="button-container-perfil">
          <Button className="boton" label="Editar" variant="outlined" color="secondary" onClick={() => volver()} />
          <Button className="boton" label="Volver" onClick={() => volver()} />
        </div>
      </div>

    </div>

  )
}

