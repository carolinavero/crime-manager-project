import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './pages/List';
import Create from './pages/Create';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/global.css';
import NewWeapon from './pages/NewWeapon';

function App() {

  return (
    <Router>
      <Route exact path="/" component={List} />
      <Route path="/add" component={Create} />
      <Route path="/weapon" component={NewWeapon} />
    </Router>
  );
}

export default App;
