import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { User } from '../../domain/user'
import { userService } from '../../services/userService'
import { SnackbarCustom } from '../snackbar/snackbarCustom'
import { Context } from '../../context/context'

export const Form = (props) => {
  const classes = useStyles()
  const mostrarContraseña = () => props.miPerfil ? 0 : 6
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {!props.miPerfil && <Grid item xs={12} sm={6}>
              <TextField
                disabled={props.disabled}
                defaultValue={props.username}
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Usuario"
                autoFocus
                onChange={(event) => props.setUsername(event.target.value)}
              />
            </Grid>}
            {!props.disabled && <Grid item xs={12} sm={mostrarContraseña()}>
              <TextField
                disabled={props.disabled}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => props.setPassword(event.target.value)}

              />
            </Grid>}
            <Grid item xs={12}>
              <TextField
                disabled={props.disabled}
                defaultValue={props.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(event) => props.setEmail(event.target.value)}
                disable
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={props.dni}
                disabled={props.disabled}
                variant="outlined"
                required
                fullWidth
                id="dni"
                label="DNI"
                name="dni"
                type='number'
                onChange={(event) => props.setDni(event.target.value)}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={props.disabled}
                defaultValue={props.name}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                onChange={(event) => props.setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={props.disabled}
                defaultValue={props.surname}
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Apellido"
                name="surname"
                onChange={(event) => props.setSurname(event.target.value)}
              />
            </Grid>
          </Grid>
        </form>

      </div>


    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',


  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: '0',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
