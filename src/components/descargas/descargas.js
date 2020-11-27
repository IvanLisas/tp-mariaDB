import React, { useEffect, useState, useContext } from 'react'
import { TablesRouter } from '../table/table'
import { Button } from 'primereact/button'
import { Context } from '../../context/context'
import { downloadService } from '../../services/downloadService'
import './descargas.css'

export const Descargas = (props) => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [descargas, setDescargas] = useState([])
  const { loggedUser } = useContext(Context)

  const [promedios, setPromedio] = useState('Promedio')

  useEffect(async () => setDescargas(await downloadService.allDownloads(loggedUser.id)), [])

  const ordenar = async () => setDescargas(await downloadService.ordernar(loggedUser.id))

  const ordenar2 = async () => setDescargas(await downloadService.ordernar2(loggedUser.id))

  const promedio = async () => setPromedio(await downloadService.promedio(loggedUser.id) + ' MB/S')

  const volver = () => { props.history.push('/inicio') }

  const buscar = async () => { setDescargas(await downloadService.busqueda(loggedUser.id, textoBusqueda)) }


  return (
    <div className='container'>
      {console.log(descargas)}

      <TablesRouter
        titulo='Mis descargas'
        elementos={descargas}
        volver={volver}
        setTextoBusqueda={(textoBusqueda) => setTextoBusqueda(textoBusqueda)}
        buscar={buscar}
      >
      </TablesRouter>
      <div class="filtros">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => ordenar()}
        >
          Ordenar por nombre ascedente
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => ordenar2()}
        >
          Ordenar por nombre Descendente
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => promedio()}
        >
          {promedios}
        </Button>
      </div>
    </div>
  )
}