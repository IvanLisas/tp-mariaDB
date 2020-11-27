import React, { useEffect, useState, useContext } from 'react'
import { TablesRouter } from '../table/table'
import { Button } from 'primereact/button'
import { Context } from '../../context/context'
import { reproductionService } from '../../services/reproductionService'

export const Reproducciones = (props) => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [reproducciones, setReproducciones] = useState([])
  const { loggedUser } = useContext(Context)

  useEffect(async () => setReproducciones(await reproductionService.allReproductions(loggedUser.id)), [])

  const volver = () => { props.history.push('/inicio') }


  return (
    <div>
      {textoBusqueda}
      <TablesRouter
        titulo='Mis reproducciones'
        elementos={reproducciones}
        volver={volver}
        setTextoBusqueda={(textoBusqueda) => setTextoBusqueda(textoBusqueda)}
        reproducion={true}
      >
      </TablesRouter>
      <div class="filtros">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"

        >
          Ordenar por nombre ascedente
      </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"

        >
          Ordenar por nombre Descendente
      </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"

        >
          Promedio
      </Button>
      </div>
    </div>
  )
}