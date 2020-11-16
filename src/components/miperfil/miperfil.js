import './miperfil.css'
import React, { useEffect, useState, useContext } from 'react'
import { FormLabel, MenuItem, Select, Snackbar, TextField } from '@material-ui/core'
import { Button } from 'primereact/button'
import CardContent from '@material-ui/core/CardContent'

export const Miperfil = (props) => {

  const volver = () => {
    props.history.push('/inicio')
  }


  return (
    <div className="perfil">
      <div className="perfil-container">
        <div className="title"> Mi Perfil </div>
        <CardContent className="linea">
          <FormLabel>Usuario</FormLabel>
          <TextField id="descripcion" header="Descripcion" className="formControl" />
          <FormLabel>Apellido</FormLabel>
          <TextField id="descripcion" header="Descripcion" className="formControl" />
          <FormLabel>Nombre</FormLabel>
          <TextField id="descripcion" header="Descripcion" className="formControl" />
          <FormLabel>Fecha de Nacimiento</FormLabel>
          <TextField id="descripcion" header="Descripcion" className="formControl" />
          <FormLabel>Email</FormLabel>
          <TextField id="descripcion" header="Descripcion" className="formControl" />
          <FormLabel>Password</FormLabel>
          <TextField id="descripcion" header="Descripcion" className="formControl" />

        </CardContent>
      
      </div>
      <div className="button-container">
        <Button className="boton" type="info" variant="outlined" color="secondary"label="Guardar Datos" onClick={() => volver()} /> 
        <Button className="boton" label="Dar de baja" variant="outlined" color="secondary" onClick={() => volver()} />
        <Button className="boton" label="Cancelar" onClick={() => volver()} />
      </div>
    </div>

  )
}

