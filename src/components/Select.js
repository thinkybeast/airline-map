import React, { Component } from 'react';

class Select extends Component {

  render(){
    return (
      <select
        name="select_airline"
        id="select_airline"
        onChange={this.props.onSelect}
      >
        <option>{this.props.allTitle}</option>
        {this.props.options.map(airline => {
          return (
            <option
              key={airline.name}
            >
              {airline.name}
            </option>
          )
        })}
      </select>
    )
  }
}

export default Select;