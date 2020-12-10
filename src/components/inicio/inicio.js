import './inicio.css'
import React, { useEffect, useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import CommentCard from './extras/commentCard'
import MusicCard from './extras/music'
import ComplexCard from './extras/complexCard'
import MediaCard from './extras/mediaCard'
import { Busqueda } from '../busqueda/busqueda'
import { fileService } from '../../services/fileService'
import { File } from '../../domain/file'
import { Context } from '../../context/context'

export const Inicio = (props) => {

  const { busqueda } = useContext(Context)
  // const [busqueda, setBusqueda] = useState(' ')
  const [files, setFiles] = useState(null)
  const column1 = []
  const column2 = []
  const column3 = []

  useEffect(async () => {
    setFiles(await fileService.searchFiles(busqueda))
  }, [busqueda])

  // useEffect(async () => {
  //   setFiles(await fileService.searchFiles(busqueda))

  // }, [])



  const createColumns = () => {

    for (var i = 0; i < files.length - 10; i++) {
      if (i % 3 == 0) column1.push(files[i])
      if (i % 3 == 1) column2.push(files[i])
      if (i % 3 == 2) column3.push(files[i])
    }

  }

  return (
    <div>
      {files && createColumns()}
      <div className="inicio">
        {/* {files && files.map(file => file.card)} */}
        <div className="column">
          {files && column1.map(file => file.card)}
        </div>
        <div className="column">
          {files && column2.map(file => file.card)}
        </div>
        <div className="column">
          {files && column3.map(file => file.card)}
        </div>
      </div>
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