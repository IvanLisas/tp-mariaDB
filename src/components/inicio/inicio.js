import './inicio.css'
import React, { useEffect, useState, useContext } from 'react'

import { Button } from 'primereact/button'
 

export const Inicio = (props) => {
 
  const irADescargas =() =>{
    props.history.push('/descargas')
  }

   const irAReproducciones = () => {
    props.history.push('/reproducciones')

  }

  const salir = () => {
    props.history.push('/login')

  }

  const irAPerfil =() =>{
    props.history.push('/miperfil')
  }
  
    return (
       
        <div className="inicio">
          <div className="inicio-container">
            <div className="title"> Inicio </div>
            <div className='ladoDerecho'>
            <div className='button-container'> 
               <Button className ="reproducciones"type="info" variant="outlined" label="Mis descargas" onClick ={() => irADescargas()} ></Button>
                <Button className ="descargas"type="info"   variant="outlined"  label="Mis reproducciones"onClick = {() => irAReproducciones()} ></Button>
                   </div>
                      </div>
                      <div className='ladoIzquierdo'>
            <div className='button-container'> 
               <Button className ="miperfil"type="info" variant="outlined" label="Mi Perfil" onClick ={() => irAPerfil()} ></Button>
                <Button className ="salir"type="info" variant="outlined" label="Salir" onClick = {() => salir()} ></Button>
                   </div>
                      </div>
            
          </div>
        </div>
       
      )

}