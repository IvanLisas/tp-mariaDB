
import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { withRouter } from 'react-router-dom'
import { Filtro } from '../../../domain/filtro'

export const Tabla = (props) => {
  const [tituloBusqueda, setTituloBusqueda] = useState('')
  const [autorBusqueda, setAutorBusqueda] = useState('')
  const [tipoBusqueda, setTipoBusqueda] = useState('')
  const [extraCellBusqueda, setExtraCellBusqueda] = useState('')
  const [fechaBusqueda, setFechaBusqueda] = useState('')

  const [aux, setAux] = useState('a')

  useEffect(async () => {
    let filtrosAux = []
    filtrosAux.push(new Filtro('title', tituloBusqueda))
    // filtrosAux.push(new Filtro('username', autorBusqueda))
    // filtrosAux.push(new Filtro('file.type', tipoBusqueda))
    // filtrosAux.push(new Filtro(props.extraCellFilter, extraCellBusqueda))
    // filtrosAux.push(new Filtro('date_init', fechaBusqueda))
    // await props.search(filtrosAux)
  }, [tituloBusqueda, autorBusqueda, tipoBusqueda, fechaBusqueda, extraCellBusqueda])

  const onDateFilterFunction = async (event, value) => {
    console.log(value ? true : false)
    setTituloBusqueda(value)

    // let filtrosAux = []
    // filtrosAux.push(new Filtro('title', 'com'))
    // // console.log(value)
    // setTituloBusqueda(value)
    // console.log(await props.search(filtrosAux))
    // const descargas = await props.search([new Filtro('title', 'com')])
    // console.log(descargas)
    // props.set(descargas)
    // return props.rows
  }

  const filtrar = async () => {
    await props.search(new Filtro('titulo', 'com'))
  }

  const codeFilter = (event, a) => {
    // console.log(filter > value)
    // return filter > value
    // console.log(event)
    return props.rows
  }

  return (
    <div>
      {tituloBusqueda}
      <DataTable
        header="Mis descargas"
        selectionMode="single"
        value={props.rows}
        autoLayout={true}
      // className="p-datatable-striped tabla"
      // onSelectionChange={mensaje => irAlMensaje(mensaje.value)}
      >
        <Column ></Column>
        <Column field="title" header="Titulo" filter filterFunction={onDateFilterFunction} filterMatchMode="custom" ></Column>
        <Column field="autor" header="Autor" sortable filter></Column>
        <Column field="type" header="Tipo" sortable filter></Column>
        <Column field="extra" header="Extra" sortable filter ></Column>

      </DataTable >
    </div>
  )
}
export default withRouter(Tabla)
