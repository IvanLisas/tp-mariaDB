import React, { useEffect, useState, useContext } from 'react'
import { TablesRouter } from '../table/table'
import { Button } from 'primereact/button'
import { Context } from '../../context/context'
import { downloadService } from '../../services/downloadService'

export const Descargas = (props) => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [descargas, setDescargas] = useState([])
  const { loggedUser } = useContext(Context)

  useEffect(async () => setDescargas(await downloadService.allDownloads(loggedUser.id)), [])

  const volver = () => { props.history.push('/inicio') }



  return (
    <div>
      {console.log(descargas)}
      <TablesRouter
        titulo='Mis descargas'
        elementos={descargas}
        volver={volver}
        setTextoBusqueda={(textoBusqueda) => setTextoBusqueda(textoBusqueda)}
      >
      </TablesRouter>
    </div>
  )
}