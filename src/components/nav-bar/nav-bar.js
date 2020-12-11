import React, { useEffect, useState, useContext } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import { Context } from '../../context/context'
import { NavBarButton } from './nav-bar-button/nav-bar-button'
import Button from '@material-ui/core/Button'
import './nav-bar.css'

export const NavBar = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const { loggedUser } = useContext(Context)
  const { updateLoggedUser } = useContext(Context)
  const { buscar } = useContext(Context)

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  const irADescargas = () => props.history.push('/descargas')

  const irAReproducciones = () => props.history.push('/reproducciones')
  const irAMiPerfil = () => props.history.push('/miperfil')

  const salir = () => {
    updateLoggedUser(undefined)
    props.history.push('/')
  }


  const menuId = 'primary-search-account-menu'



  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={() => props.history.push('/inicio')}
            disableElevation
          >
            <span class="material-icons">
              home
            </span>
            {/* Home */}
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => buscar(event.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography className={classes.title} variant="caption" noWrap>
              <div className='saludo-container'>
                <span class="material-icons">
                  wb_sunny
                </span>
                <div>
                  Buenos día {loggedUser.name}
                </div>

              </div>
            </Typography>
            {/* <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </div>
          <NavBarButton
            irADescargas={irADescargas}
            irAReproducciones={irAReproducciones}
            irAMiPerfil={irAMiPerfil}
            salir={salir} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    marginRight: '3rem',

    [theme.breakpoints.up('sm')]: {
      display: 'block',

    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))
