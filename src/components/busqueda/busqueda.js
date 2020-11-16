import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import './busqueda.css'

export const Busqueda = (props) => {
  return (
    <div className='busqueda-container '>
      <div className="p-col-12 p-md-2">
        <div className="p-inputgroup">
          <InputText
            id="busqueda"
            placeholder="Busqueda"
            autoComplete="off"
            onChange={(event) => props.onChange(event.target.value)} />
          <Button icon="pi pi-search" />
        </div>
      </div>
     
    </div>
  )
}