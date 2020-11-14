// import { Mensaje } from '../dominio/mensaje'
// import axios from 'axios'
// import { REST_SERVER_URL } from './constants'
// export class MensajeService {

//   mensajes = []

//   async getAllMensajes(userId) {

//     const mensajesJSON = await axios.get(`${REST_SERVER_URL}/todosLosMensajesDe/${userId}`)
//     this.mensajes = mensajesJSON.data.map(mensaje => Mensaje.fromJSON(mensaje))
//   }

//   getMensajes(textoBusqueda) { return this.mensajes.filter((mensaje) => mensaje.emisorContiene(textoBusqueda)) }

//   async searchMesagges(value, userId) {
//     console.log(userId, 'Llamada al backend')
//     const MesaggesJSON = await axios.put(`${REST_SERVER_URL}/buscarMensajes/${userId}`, value, { headers: { 'Content-Type': 'text/plain' } })
//     return MesaggesJSON.data.map(mensaje => Mensaje.fromJSON(mensaje))
//   }

//   async borrarMensaje(userId, mensajeId) { await axios.delete(`${REST_SERVER_URL}/borrarMensaje/${userId}/${mensajeId}`) }

// }

// export const mensajeService = new MensajeService()

// export const mensajes = [
//   new Mensaje('Juana', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Ramon', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Pedro', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Jose', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Vicente', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Roberto', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Susana', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Tamara', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('lorena', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Filomena', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
//   new Mensaje('Pepe', 'Pablo', '12/12/2019', '14:04', '12/12/2019', '14:04', 'Hola', true),
// ]

// export const mensajeServiceFuncional = () => {

//   const mensajes = []

//   const getAllMensajes = async (userId) => {
//     console.log(userId, 'Llamada al backend')
//     const mensajesJSON = await axios.get(`${REST_SERVER_URL}/todosLosMensajesDe/${userId}`)
//     mensajes = mensajesJSON.data.map(mensaje => Mensaje.fromJSON(mensaje))
//   }

//   const getMensajes = async (textoBusqueda) => mensajes.filter((mensaje) => mensaje.emisorContiene(textoBusqueda))

//   const borrarMensaje = async (userId, mensajeId) => await axios.delete(`${REST_SERVER_URL}/borrarMensaje/${userId}/${mensajeId}`)

// }

