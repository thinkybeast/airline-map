import React, { Component } from 'react';
import './App.css';
import Routes from './data';
import Table from './components/Table'
import Select from './components/Select'




class App extends Component {
  state = {
    selectedRoutes: Routes.routes,
  }

  formatValue = (property, value) => {
    return (property === 'airline') ? Routes.getAirlineById(value) :
                                      Routes.getAirportByCode(value);
  }

  handleAirlineChange = (e) => {
    const selectedAirline = e.target.value;
    if(selectedAirline === 'All Airlines') {
      this.setState({
        selectedRoutes: Routes.routes,
      });
      return;
    }

    const selectedRoutes = Routes.routes.filter((route) => {
      const airline = Routes.getAirlineById(route.airline);
      return selectedAirline === airline;
    })
    this.setState({
      selectedRoutes: selectedRoutes,
    })
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <div>
            <span>Show routes on </span>
            <Select
              options={Routes.airlines}
              allTitle="All Airlines"
              onSelect={this.handleAirlineChange}
            />
          </div>

          <Table className='routes-table' columns={columns} rows={this.state.selectedRoutes} format={this.formatValue} perPage={30} />
        </section>
      </div>
    );
  }
}

export default App;