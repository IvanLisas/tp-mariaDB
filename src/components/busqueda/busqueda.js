import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'primereact/button'
// import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import './busqueda.css'
import SearchIcon from '@material-ui/icons/Search'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import InputAdornment from '@material-ui/core/InputAdornment'

export const Busqueda = (props) => {
  return (
    <div className='busqueda-container '>
      <div className="p-col-12 p-md-2">
        <div className="p-inputgroup">
          <TextField
            placeholder={props.placeholder}
            autoComplete="off"
            onChange={(event) => props.onChange(event.target.value)}
            type={props.type}
            color="primary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">

                </InputAdornment>
              ),
            }}

          />
        </div>
      </div>
    </div>
  )
}