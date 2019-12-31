import React, { Component } from 'react';
import './App.css';
import Routes from './data';
import Table from './components/Table'
import Select from './components/Select'


class App extends Component {
  state = {
    airlineFilter: "",
    airportFilter: "",
  }

  isFilterSelected = () => {
    return this.state.airlineFilter || this.state.airportFilter;
  }

  formatValue = (property, value) => {
    return (property === 'airline') ? Routes.getAirlineById(value) :
                                      Routes.getAirportByCode(value);
  }

  showAllRoutes = () => {
    this.setState({
      airlineFilter: "",
      airportFilter: "",
    })
  }

  filterByAirline = (routes) => {
    return routes.filter((route) => {
      const airline = Routes.getAirlineById(route.airline);
      return this.state.airlineFilter === airline;
    })
  }

  filterByAirport = (routes) => {
    const code = Routes.airports.find((airport) => {
      return airport.name === this.state.airportFilter;
    }).code;

    return routes.filter(route => {
      return route.src === code || route.dest === code;
    })
  }

  handleAirlineChange = (e) => {
    const selection = (e.target.value === 'All Airlines') ? "" : e.target.value;
    this.setState({ airlineFilter: selection })
  }

  handleAirportChange = (e) => {
    const selection = (e.target.value === 'All Airports') ? "" : e.target.value;
    this.setState({ airportFilter: selection })
  }

  getFilteredRoutes = () => {
    let filteredRoutes = Routes.routes;

    if(this.state.airlineFilter) {
      filteredRoutes = this.filterByAirline(filteredRoutes);
    }

    if(this.state.airportFilter) {
      filteredRoutes = this.filterByAirport(filteredRoutes);
    }

    return filteredRoutes;
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    let filteredRoutes = this.getFilteredRoutes();

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <div id="routeFilter">
            <span>Show routes on </span>
            <Select
              valueKey="airline-select"
              titleKey="airline"
              options={Routes.airlines}
              allTitle="All Airlines"
              onSelect={this.handleAirlineChange}
              value={this.state.airlineFilter}
            />
            <span> fliying in or out of </span>
            <Select
              valueKey="airport-select"
              titleKey="airport"
              options={Routes.airports}
              allTitle="All Airports"
              onSelect={this.handleAirportChange}
              value={this.state.airportFilter}
            />
            <button
              onClick={this.showAllRoutes}
              disabled={!this.isFilterSelected()}
            >
              Show All Routes
            </button>
          </div>

          <Table
            className='routes-table'
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            perPage={30}
          />
        </section>
      </div>
    );
  }
}

export default App;