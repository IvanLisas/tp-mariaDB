import './inicio.css'
import React, { useEffect, useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import CommentCard from './extras/commentCard'
import Music from './extras/music'
import ComplexCard from './extras/complexCard'
import MediaCard from './extras/mediaCard'

export const Inicio = (props) => {

  const irADescargas = () => props.history.push('/descargas')

  const irAReproducciones = () => props.history.push('/reproducciones')

  const salir = () => props.history.push('/login')

  const irAPerfil = () => props.history.push('/miperfil')

  return (

    <div className="inicio">
      <div className="column">
        <Music
          banda='Yuya'
          cancion='Ilari lari e'
          imagen='/yuya.jpg'

        />
        <CommentCard
          encabezado='Archivo'
          titulo='Documental sobre tu madre'
          cuerpo='Apasinante documental'
          cuerpo2='Sobre tu madre'
        />
        <Music
          banda='Los sultanes'
          cancion='Te voy a dar'
          imagen='/losSultanes.jpg'
        />
      </div>
      <div className="column">
        <MediaCard
          cuerpo='Bottazzi se quiere comprar la Xbox pero no encuentra stock.'
          titulo='Xbox'
          imagen='/xbox.jpg'
        />
        <CommentCard
          encabezado='Archivo'
          titulo='Resultados de la quinela'
          cuerpo='Un excel con lo que sale mañana'
          cuerpo2='Si falla no hay rebolso' /></div>
      <div className="column">
        <ComplexCard
          titulo='Chorizo Portuano'
          cuerpo='Receta que nadie se debe perder'
          imagen='/chorizo.jpg'
        />
        <Music
          banda='Las ketchup'
          cancion='Asereje'
          imagen='/asereje.jpg'
        />  </div>
    </div>

  )

}




//   return (

//     <div className="inicio">
//       <div className="inicio-container">
//         <div className="title"> Inicio </div>
//         <div className='ladoDerecho'>
//           <div className='button-container'>
//             <Button className="reproducciones" type="info" variant="outlined" label="Mis descargas" onClick={() => irADescargas()} ></Button>
//             <Button className="descargas" type="info" variant="outlined" label="Mis reproducciones" onClick={() => irAReproducciones()} ></Button>
//           </div>
//         </div>
//         <div className='ladoIzquierdo'>
//           <div className='button-container'>
//             <Button className="miperfil" type="info" variant="outlined" label="Mi Perfil" onClick={() => irAPerfil()} ></Button>
//             <Button className="salir" type="info" variant="outlined" label="Salir" onClick={() => salir()} ></Button>
//           </div>
//         </div>

//       </div>
//     </div>

//   )

// }