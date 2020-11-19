import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './pages/List';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/global.css';

function App() {

  return (
    <Router>
      <Route exact path="/" component={List} />
    </Router>
  );
}

export default App;
