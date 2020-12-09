import './miPerfil.css'
import React, { useEffect, useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Context } from '../../../context/context'
import { userService } from '../../../services/userService'
import { reproductionService } from '../../../services/reproductionService'
import { downloadService } from '../../../services/downloadService'
import { Chart } from 'primereact/chart'
import PersonIcon from '@material-ui/icons/Person'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import CakeIcon from '@material-ui/icons/Cake'
import Link from '@material-ui/core/Link'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SpeedIcon from '@material-ui/icons/Speed'
import GetAppIcon from '@material-ui/icons/GetApp'
import MovieFilterIcon from '@material-ui/icons/MovieFilter'
import DevicesIcon from '@material-ui/icons/Devices'

export const MiPerfil = (props) => {
  //Contexto
  const { loggedUser } = useContext(Context)
  const { updateLoggedUser } = useContext(Context)

  const [open, setOpen] = React.useState(false)

  //Estadisticas
  const [descargasUltimos12Meses, setDescargasUltimos12Meses] = useState([])
  const [reproduccionesUltimos12Meses, setReproduccionesUltimos12Meses] = useState([])
  const [speedAverage, setSpeedAverage] = useState()
  const [mostUsedOs, setMostUsedOs] = useState()
  const [downloadAverage, setDownloadAverage] = useState()
  const [reproductionAverage, setReproductionAverage] = useState()
  const [month] = useState()
  const [year] = useState()
  const reproductionData = {
    labels: reproduccionesUltimos12Meses.map(r => r.date),
    datasets: [
      {
        label: 'Cantidad',
        backgroundColor: '#66BB6A',
        data: reproduccionesUltimos12Meses.map(r => r.count)
      }
    ]

  }

  const downloadData = {
    labels: descargasUltimos12Meses.map(r => r.date),
    datasets: [
      {
        label: 'Cantidad',
        backgroundColor: '#FFB74D',
        data: descargasUltimos12Meses.map(r => r.count)
      }
    ]

  }

  const options = {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: true
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#495057'
        },
        gridLines: {
          color: '#ebedef'
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          min: 0,
          fontColor: '#495057'
        },
        gridLines: {
          color: '#ebedef'
        }
      }]
    },
    legend: {
      labels: {
        fontColor: '#495057'
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }



  const desactivarCuenta = async () => {
    await userService.deleteUser(loggedUser)
    updateLoggedUser(undefined)
    props.history.push('/login')
  }


  useEffect(async () => {
    setReproduccionesUltimos12Meses(await reproductionService.reproductionsLast12Month(loggedUser.id))
    setDescargasUltimos12Meses(await downloadService.downloadsLast12Months(loggedUser.id))
    setSpeedAverage(await downloadService.downloadSpeedAvg(loggedUser.id))
    setDownloadAverage(await downloadService.downloadsAverage(loggedUser.id))
    setReproductionAverage(await reproductionService.reproductionAverage(loggedUser.id))
  }, [])

  return (
    <div className='perfil'>
      <div className='perfil-container'>

        <div className='datos-estadisticas'>
          <div className='datos-container'>
            <div className='titulo-container'>
              <a> {loggedUser.name} {loggedUser.surname}</a>
            </div>
            <div className='datos-container'>
              <a className='dato'><PersonIcon />{loggedUser.username}</a>
              <a className='dato'><AlternateEmailIcon />{loggedUser.email}</a>
              <a className='dato' type='number'><AssignmentIndIcon /> {loggedUser.dni}</a>
              <a className='dato'><CakeIcon />20/05/1995</a>
            </div>
            <div className='links-container'>
              <Link className="link" onClick={() => handleClickOpen()}  >
                {'Desactivar cuenta'}
              </Link>
              <Link className="link" onClick={() => props.history.push('/cambiarContraseña')}>
                {'Cambiar contraseña'}
              </Link>
              <Link className="link" onClick={() => props.history.push('/editarPerfil')}  >
                {'Editar infomacion personal'}
              </Link>


            </div>

          </div>
          <div className='estadisticas-container'>
            <div className='titulo-container'>
              <a> Mis estadisticas</a>
            </div>
            <div className='estadisticas'>
              <div className='grafico-container'>
                <h5>Mis descargas en los ultimos 12 meses: {descargasUltimos12Meses.map(r => r.count).reduce((a, b) => a + b, 0)} </h5>
                <Chart type="bar" data={downloadData} options={options} height width='350px' />
                <div className='dato'>
                  <GetAppIcon />Promedio de descargas por mes: {downloadAverage}
                </div>
                <div className='dato'>
                  <SpeedIcon />Promedio de velocidad de descarga: {speedAverage} MB/S
                </div>
              </div>
              <div className='grafico-container'>
                <h5>Mis reproducciones en los ultimos 12 meses: {reproduccionesUltimos12Meses.map(r => r.count).reduce((a, b) => a + b, 0)} </h5>
                <Chart type="bar" data={reproductionData} options={options} width='350px' />
                <div className='dato'>
                  <MovieFilterIcon />Promedio de reproducciones por mes: {reproductionAverage}
                </div>
                <div className='dato'>
                  <DevicesIcon />Sistema operativo mas usado: IOS
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Desea desactivar su cuenta?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Una vez desactivada su cuenta sus archivos seguiran estando en el servidos para futuras descargas, si desea borrar la cuenta contacte con el soporte tecnico.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={desactivarCuenta} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}