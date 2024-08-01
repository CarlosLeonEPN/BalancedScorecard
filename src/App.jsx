import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {AppBar, Toolbar, IconButton, Typography, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Start from './components/Start.jsx';
import './App.css';
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom';
import Perspective from './components/Perspective';
import Objective from './components/Objective';

function appBarLabel(title, objective) {
  return (
    <Toolbar id='toolBar'>
      <div id='toolBarTitle'>
        <div>
          <Typography variant="h6" noWrap component="div" className='toolBarText' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {objective && (
                  <Typography variant="subtitle1" noWrap component="div">
                    {objective}
                  </Typography>
                )}
        </div>
      </div>
      <Button color="inherit">
        <a href="/" className='toolBarText'>Inicio</a>
      </Button>
    </Toolbar>
  );
}

function App() {
  const [title, setTitle] = useState('PERSPECTIVAS');
  const [objective, setObjective] = useState('');

  return (
    <div id='AppMain'>
      <header>
        <AppBar position="static" color="primary" enableColorOnDark>
          {appBarLabel(title, objective)}
        </AppBar>
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start setTitle={setTitle} setObjective={setObjective}/>}></Route>
            <Route path="/perspective" element={<Perspective setTitle={setTitle} setObjective={setObjective}/>}></Route>
            <Route path="/perspective/objective" element={<Objective setTitle={setTitle} setObjective={setObjective} />} />
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  )
}

export default App;
