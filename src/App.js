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

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>

        </div>
      </Router>

    );
  }
}

export default App;
