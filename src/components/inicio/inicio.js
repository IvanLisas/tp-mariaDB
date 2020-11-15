import './inicio.css'
import React, { useEffect, useState, useContext } from 'react'
 
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
 

export const Inicio = (props) => {

    // redirigirA = () => {
    //     if(className="reproducciones"){
    //         this.props.history.push('/reproducciones') 
    //     }else
    //     if(className="descargas"){
    //         this.props.history.push('/descargas') 

    //     }else
    //     if(className="perfil"){
    //      this.props.history.push('/perfil') 

    //     }else  this.props.history.push('/') 

    // }
        // <Button className={"reproducciones" ? this.props.history.push('/reproducciones') : <Button className="descargas" ?
        // this.props.history.push('/descargas') 
    }
 
  
    return (
        <div className="inicio">
          <div className="inicio-container">
            <div className="title"> Inicio </div>
            <div className='lado-derecho'>
            <div className='button-container'> 
            <Button className ="reproducciones"type="submit" variant="outlined" color="secondary"  >Reproducciones  </Button>
            <Button className ="descargas"type="submit"   variant="outlined" color="secondary"   >  Descargas</Button></div></div>
            {/* <Button className ="reproducciones"type="submit" variant="outlined" color="secondary" onClick={this.redirigirA()} >Reproducciones  </Button>
            <Button className ="descargas"type="submit"   variant="outlined" color="secondary" onClick={this.redirigirA()}  >  Descargas</Button></div></div> */}
            <div className='lado-izquierdo'>
                 <div className="button-container">
                  <Button className ="perfil" type="submit" variant="outlined" color="secondary" > Mi Perfil </Button>
                  <Button className ="salir" type="submit"variant="outlined" color="secondary"  > Salir</Button>
                  {/* <Button className ="perfil" type="submit" variant="outlined" color="secondary"onClick={this.redirigirA() > Mi Perfil </Button>
                  <Button className ="salir" type="submit"variant="outlined" color="secondary" onClick={this.redirigirA() > Salir</Button> */}
                  </div>
           </div>
            {/* <Button icon={passwordIconEye()} onClick={() => setshowPassword(!showPassword)} /> */} 
          </div>
        </div>
      )

}