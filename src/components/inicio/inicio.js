import './inicio.css'
import React, { useEffect, useState, useContext } from 'react'
 
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
 

export const Inicio = (props) => {

    // redirigirA = () => {
    //     // <Button className={"reproducciones" ? this.props.history.push('/') : 'fa fa-envelope'></Button>
    //     // in production :p
    //   }
 
  
    return (
        <div className="inicio">
          <div className="inicio-container">
            <div className="title"> Inicio </div>
            <div className='lado-derecho'>
            <div className='button-container'> 
            <Button className ="reproducciones"type="submit" variant="outlined" color="secondary"  >Reproducciones  </Button>
            <Button className ="descargas"type="submit"   variant="outlined" color="secondary"   >  Descargas</Button></div></div>
            <div className='lado-izquierdo'>
                 <div className="button-container">
                  <Button className ="perfil" type="submit" variant="outlined" color="secondary" > Mi Perfil </Button>
                  <Button className ="salir" type="submit"variant="outlined" color="secondary"  > Salir</Button>
                  </div>
           </div>
            {/* <Button icon={passwordIconEye()} onClick={() => setshowPassword(!showPassword)} /> */} 
          </div>
        </div>
      )

}