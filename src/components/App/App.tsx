import './Shared.scss';
import './App.scss';

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from '../Shared/Header';
import { Guide } from '../Pages/Guide';

export class App extends Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return(
      <Router>
        <Header/>
        <div className="container">
          <Switch>
            <Route path="/"><Guide/></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
