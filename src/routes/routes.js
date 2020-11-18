/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from '../components/login/login'
import { Inicio } from '../components/inicio/inicio'
import { Miperfil } from '../components/miperfil/miperfil'
import { Descargas } from '../components/descargas/descargas'
import { Reproducciones } from '../components/reproducciones/reproducciones'
import { Context } from '../context/context'
import { NavBar } from '../components/nav-bar/nav-bar'
import { SingUp } from '../components/singUp/singUp'
import { Tables } from '../components/table/table'

export const MainRoutes = () => {

  const { loggedUser } = useContext(Context)

  return (
    <Router>
      {loggedUser && <Route component={NavBar} />}

      <Switch>
        {loggedUser && <Route path="/miperfil" component={Miperfil} />}
        {loggedUser && <Route path="/descargas" component={Descargas} />}
        {loggedUser && <Route path="/reproducciones" component={Reproducciones} />}
        {loggedUser && <Route path="/inicio" component={Inicio} />}
        {loggedUser && <Route path="/" component={Inicio} />}
        {!loggedUser && <Route path="/registrarse" component={SingUp} />}
        {!loggedUser && <Route path="/" component={Login} />}

      </Switch>
    </Router>)

}


//export const FoodOverflowRoutes = () => (
//     <Router>

//         <Switch>
//             <Route exact path="/" component={Login} />
//             <Route exact path="/main" component={Demo} />
//             {/* <Route exact path="/inbox" component={Inbox} /> */}
//         </Switch>

//     </Router>
// )
// export const FoodOverflowRoutes2 = () => (
//     <Router>
//         <Route exact path="/main/inbox" component={Busqueda} />

//     </Router>
// )