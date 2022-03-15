import React, {useState} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {Box} from '@material-ui/core'

//components
import Home from './components/Home';
import DetailView from './posts/DetailView';
import CreateView from './posts/CreateView';
import UpdateView from './posts/UpdateView';
import Header from './components/Header'
import Login from './components/account/Login'

import './App.css';


const App = () => {

  const [userInfo, setUserInfo] = useState()
  
  return userInfo ? (
    <BrowserRouter>
    <Route path="/"><Header setUserInfo={setUserInfo}/></Route>
    <Box style={{ marginTop: 64 }}>
        <Switch>
            <Route exact path='/' component={Home} />     
            <Route exact path='/detail/:id'><DetailView userInfo={userInfo} /></Route>
            <Route exact path='/create'><CreateView userInfo={userInfo} /></Route>
            <Route exact path='/update/:id' component={UpdateView} />
        </Switch>
    </Box>
    </BrowserRouter>
  ):
  <Login setUserInfo={setUserInfo} />
}

export default App;