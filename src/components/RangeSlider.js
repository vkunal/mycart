import React, { Component } from 'react';
import InputRange from 'react-input-range';
import './rangeslider.css';
 
class RangeSlider extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: { min: 100, max: 1000 }
    };
  }
  
  render() {
      const {rangePriceFilter} = this.props;
     return (
        <>
      <InputRange
        maxValue={1010}
        minValue={1}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
        <div className="text-center">
        <button className="btn btn-primary rounded" onClick={() => rangePriceFilter(this.state.value)}>Apply</button>
        </div>
        </>
    );
  }
}

export default RangeSlider;