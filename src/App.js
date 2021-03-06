import React from 'react';
import './App.css';
import Todos from './component/Todos';
import Login from './component/Login';
import Registration from './component/Registration';

import { BrowserRouter as Router,Route } from "react-router-dom";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Todos} />
          <Route path='/Login' component={Login} />
          <Route path='/Registration' component={Registration} />
        </Router>
      </div>
    );
  }
}

export default App;
