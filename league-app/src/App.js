import React from 'react';
import Main from './components/Main.js';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <div className="app">
      <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;
