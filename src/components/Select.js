import React, { Component } from 'react';

class Select extends Component {

  render(){
    return (
      <select
        name={this.props.titleKey}
        id={this.props.valueKey}
        onChange={this.props.onSelect}
      >
        <option>{this.props.allTitle}</option>
        {this.props.options.map((option, idx) => {
          return (
            <option
              key={option.name + String(idx)}
            >
              {option.name}
            </option>
          )
        })}
      </select>
    )
  }
}

export default Select;