import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Display from '../components/serviceProvider/display';
import Recomandation from '../components/customers/recomanadation';
import Payment from '../components/customers/payments';
import Mc from '../components/serviceProvider/mc';
import Decorators from '../components/serviceProvider/decorator';
import Halls from '../components/serviceProvider/halls';
import Muscians from '../components/serviceProvider/musician';
import Booking from '../components/serviceProvider/booking';
import OneMc from '../components/layouts/specificMc';
import OneDec from '../components/layouts/specificDecorator';
import OneMusic from '../components/layouts/specifcMusician';
import OneHall from '../components/layouts/specifcHalls';
import Profile from '../components/serviceProvider/profile';
import About from '../components/about';


import RecomadationView from '../components/customers/recomandationView'









class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (

      <Router>
        <Switch>
          <Route exact={true} path="/recomadation" component={Recomandation}></Route>
          <Route exact={true} path="/recomadationView" component={RecomadationView}></Route>
          <Route exact={true} path="/Payment" component={Payment}></Route>
          <Route exact={true} path="/" component={Display}></Route>
          <Route exact={true} path="/master_of_ceremony" component={Mc}></Route>
          <Route exact={true} path="/decorators" component={Decorators}></Route>
          <Route exact={true} path="/halls" component={Halls}></Route>
          <Route exact={true} path="/musicians" component={Muscians}></Route>
          <Route exact={true} path="/about" component={About}></Route>
          <Route exact={true} path="/booking" component={Booking}></Route>
          <Route exact={true} path="/masterOfCeremony/:id" component={OneDec}></Route>
          <Route exact={true} path="/decorator/:id" component={OneMc}></Route>
          <Route exact={true} path="/musician/:id" component={OneMusic}></Route>
          <Route exact={true} path="/hall/:id" component={OneHall}></Route>
          <Route exact={true} path="/profile/:id" component={Profile}></Route>

        </Switch>
      </Router>

    );
  }
}

export default App;
