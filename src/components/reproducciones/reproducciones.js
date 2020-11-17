import './reproducciones.css'
import React, { useEffect, useState, useContext } from 'react'
import { Column } from 'primereact/column'
import {DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import {Busqueda} from '../busqueda/busqueda'
import { Panel } from 'primereact/panel'
import { InputText } from 'primereact/inputtext'

export const Reproducciones = (props) => {
    const [textoBusqueda, setTextoBusqueda] = useState('')

  const volver = () =>{
    props.history.push('/inicio')
  }

  return (
    <Panel className="contenedor-principal" header="Mis Reproducciones">
       <div>
       <Busqueda onChange={(textoBusqueda) => setTextoBusqueda(textoBusqueda)} /> 
      <DataTable>
        <Column field="titulo" header="Titulo" sortable> <div>  <InputText
            id="busqueda"
            placeholder="Busqueda"
            autoComplete="off"
            onChange={(event) => props.onChange(event.target.value)} /></div></Column>
        <Column field="tipo" header="Tipo" sortable> </Column>
        <Column field="fecha" header="Fecha"></Column>
      </DataTable>  
      
      </div>
      <div class="Button-container">
      <Button className="p-button-raised buton" label="Volver" onClick={() => volver()} />
      </div>
    </Panel>
    
   
     

  )
}