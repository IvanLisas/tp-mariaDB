import './miperfil.css'
import React, { useEffect, useState, useContext } from 'react'
import { FormLabel, MenuItem, Select, Snackbar, TextField } from '@material-ui/core'
import { Button } from 'primereact/button'
import CardContent from '@material-ui/core/CardContent'
import { Context } from '../../context/context'

export const Miperfil = (props) => {
  const { loggedUser } = useContext(Context)

  const volver = () => props.history.push('/inicio')

  return (
    <div className="perfil">
      <div className="perfil-container">
        <div className="title"> Mi Perfil </div>
        <CardContent className="linea">
          <TextField id="usuario_form" label="Usuario" />
          <TextField id="nombre_form" label="Nombre" />
          <TextField id="usuario_form" label="Apellido" />
          <TextField id="dni_form" label="DNI" type='number' />
          <TextField
            id="date_form"
            label="Fecha de nacimiento"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField id="email_form" label="Email" type='mail' />
        </CardContent>

      </div>
      <div className="button-container">
        <Button className="boton" type="info" variant="outlined" color="secondary" label="Guardar Datos" onClick={() => volver()} />
        <Button className="boton" label="Dar de baja" variant="outlined" color="secondary" onClick={() => volver()} />
        <Button className="boton" label="Cancelar" onClick={() => volver()} />
      </div>
    </div>

  )
}

