import './miPerfil.css'
import React, { useEffect, useState, useContext } from 'react'
import { FormLabel, MenuItem, Select, Snackbar, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import { Context } from '../../../context/context'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Form } from '../../form/form'
import { userService } from '../../../services/userService'
import { User } from '../../../domain/user'
import { SnackbarCustom } from '../../snackbar/snackbarCustom'
import { reproductionService } from '../../../services/reproductionService'
import { downloadService } from '../../../services/downloadService'
import { Chart } from 'primereact/chart'
import PersonIcon from '@material-ui/icons/Person'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import CakeIcon from '@material-ui/icons/Cake'
import Link from '@material-ui/core/Link'

export const MiPerfil = (props) => {
  //Contexto
  const { loggedUser } = useContext(Context)
  const { updateLoggedUser } = useContext(Context)
  //Perfil
  // const [username, setUsername] = useState(loggedUser.username)
  // const [password, setPassword] = useState(loggedUser.password)
  // const [email, setEmail] = useState(loggedUser.email)
  // const [name, setName] = useState(loggedUser.name)
  // const [surname, setSurname] = useState(loggedUser.surname)
  // const [dni, setDni] = useState(loggedUser.dni)
  // const [date, setDate] = useState(loggedUser.date)

  //SnackBar
  const [errorMessage, setErrorMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  //Estadisticas
  const [descargasUltimos12Meses, setDescargasUltimos12Meses] = useState([])
  const [reproduccionesUltimos12Meses, setReproduccionesUltimos12Meses] = useState([])
  const [reproducionesPromedio, setReproducionesPromedio] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
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


  const volver = () => props.history.push('/inicio')

  const cambiarEditar = () => setNoEditable(!noEditable)

  const editarPerfil = async () => {
    await userService.updateUser(new User(loggedUser.username, surname, name, dni, email, password, date))
    setErrorMessage('Usuario actualizado con exito')
    setSnackbarOpen(true)
    setNoEditable(true)
  }

  const borrarPerfil = async () => {
    await userService.deleteUser(loggedUser)
    updateLoggedUser(undefined)
    props.history.push('/login')
  }

  const reproductionsByDate = async () => {
    reproductionService.reproductionsByDate(loggedUser.id, month, year)
  }

  useEffect(async () => {
    setReproduccionesUltimos12Meses(await reproductionService.reproductionsLast12Month(loggedUser.id))
    setDescargasUltimos12Meses(await downloadService.downloadsLast12Months(loggedUser.id))
    setReproducionesPromedio(await reproductionService.reproductionAverage(loggedUser.id))
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
                <h5>Mis descargas en los ultimos 12 meses</h5>
                <Chart type="bar" data={downloadData} options={options} width='350px' />
              </div>
              <div className='grafico-container'>
                <h5>Mis reproducciones en los ultimos 12 meses</h5>
                <Chart type="bar" data={reproductionData} options={options} width='350px' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




//   return (
//     <div className='perfil'>



//       <div className="card">
//         <Chart type="pie" data={chartData} />
//       </div>
//       Cantidad de reproduciones dado un mes y año
//       <TextField
//         variant="outlined"
//         label="Mes"
//         id="month"
//         onChange={(event) => setMonth(event.target.value)}
//       />
//       <TextField
//         variant="outlined"
//         label="Año"
//         id="year"
//         onChange={(event) => setYear(event.target.value)}
//       />
//       <Button onClick={() => reproductionsByDate()}>Buscar</Button>
//       reproducionesPromedio = {reproducionesPromedio}
//       { console.log(reproducionesPorMes)}
//       <div className='perfil-container'>


//         <Form
//           username={loggedUser.username}
//           surname={loggedUser.surname}
//           email={loggedUser.email}
//           dni={loggedUser.dni}
//           date={loggedUser.date}
//           name={loggedUser.name}
//           miPerfil={true}
//           disabled={noEditable}
//           setPassword={setPassword}
//           setEmail={setEmail}
//           setName={setName}
//           setSurname={setSurname}
//           setDni={setDni}
//           setDate={setDate}
//           title={loggedUser.username}
//           botonTitle="Editar"
//           onClick={cambiarEditar}
//         ></Form>
//         <div className="boton-container">
//           {noEditable && <div className="boton">
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={() => cambiarEditar()}
//             >
//               Editar
//             </Button>
//           </div>}
//           {!noEditable && <div className="boton">
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={() => editarPerfil()}
//             >
//               Aceptar
//             </Button>
//           </div>}
//           {!noEditable && <div className="boton">
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={() => cambiarEditar()}
//             >
//               Cancelar
//             </Button>
//           </div>}

//         </div>
//         {!noEditable && <div className="boton-borrar">
//           <Button
//             fullWidth
//             variant="contained"
//             color="seconday"
//             onClick={() => borrarPerfil()}
//           >
//             Borrar
//           </Button>
//           <SnackbarCustom
//             setSnackbarOpen={setSnackbarOpen}
//             snackbarOpen={snackbarOpen}
//             snackbarType='success'
//             snackbarMessege={errorMessage}
//             snackbarAutoHideDuration={5000}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }