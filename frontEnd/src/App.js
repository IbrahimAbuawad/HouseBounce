import React, { useContext } from 'react'
import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import Signin from './components/signin/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from './context/AuthContext'
import {
  Switch,
  Route

} from "react-router-dom";
import NotFound from './components/NotFound';
import Signup from './components/signup/Signup';
import AddProp from './components/addprop/AddProp';


function App() {
  const AuthObject = useContext(Auth);

  return (
    <>
      <Header logged={AuthObject.loggedIn} />
      <Switch>

        <Route exact path='/'>
          <Home logged={AuthObject.loggedIn} />
        </Route>

        <Route exact path='/signup'>
          <Signup logged={AuthObject.loggedIn} />
        </Route>

        <Route exact path='/addproperty'>
          <AddProp />
        </Route>

        <Route exact path='/signin'>

          <Signin logged={AuthObject.loggedIn} />
        </Route>


        <Route exact path='*' >
          <NotFound />
        </Route>

      </Switch>

    </>
  )
}

export default App
