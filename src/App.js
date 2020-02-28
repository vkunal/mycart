import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Navbar />
          <Route exact path="/" component={Home} />
          <Switch>
            <Route exact path="/cart" component={Cart} />

         </Switch>
         <Redirect to="/" />
        </div>
      </Router>

    );
  }
}

export default App;
