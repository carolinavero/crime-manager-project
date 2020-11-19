import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './pages/List';
import Create from './pages/Create';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/global.css';

function App() {

  return (
    <Router>
      <Route exact path="/" component={List} />
      <Route exact path="/add" component={Create} />
    </Router>
  );
}

export default App;
