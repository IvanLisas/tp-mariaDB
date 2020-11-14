/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from '../components/login/login'
import { Context } from '../context/context'

export const MainRoutes = () => {

  const { loggedUser } = useContext(Context)

  return (
    <Router>
      {/* {loggedUser && <Route component={NavBar} />} */}
      <Switch>
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