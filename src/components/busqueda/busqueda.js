import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import './busqueda.css'
import { Context } from '../../context/context'

export const Busqueda = (props) => {
  const {loggedUser, updateLog} = useContext(Context)
  const [keyword, setKeyword] = useState('')


  const buscar = async () => {
    try {
      updateLog(await fileService.buscar(loggedUser.id, keyword))
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(async () => {
    if (keyword === '') setKeyword(' ')
  }, [keyword])

  const onChange = (string) => {
    setKeyword(string)
  }

  return (
    <div className='busqueda-container '>
      <div className="p-col-12 p-md-2">
        <div className="p-inputgroup">
          <InputText
            id="busqueda"
            placeholder="Busqueda"
            autoComplete="off"
            onChange={(event) => onChange(event.target.value)} />
          <Button icon="pi pi-search" onClick={() => buscar()} />
        </div>
      </div>
    </div>
  )
}