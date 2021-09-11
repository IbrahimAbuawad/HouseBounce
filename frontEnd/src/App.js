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


function App() {
  const AuthObject = useContext(Auth);

  return (
    <>
      <Header logged={AuthObject.loggedIn} />
      <Switch>

        <Route path='/s'>
          <Home />
        </Route>

        <Route path='/signup'>
          <Signup logged={AuthObject.loggedIn}/>
        </Route>

        <Route path='/addproperty'>

        </Route>
        <Route path='/signin'>

          <Signin logged={AuthObject.loggedIn} />
        </Route>


        <Route path='*' >
          <NotFound />
        </Route>

      </Switch>

    </>
  )
}

export default App
