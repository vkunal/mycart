import React, { Component } from 'react';
import { connect } from 'react-redux';
import './sorting.scss';

class Sorting extends Component {
    render() {
        const {sortByPriceAsc, sortByPriceDsc, sortByDiscount} = this.props;
        return (
            <>
                <strong className="float-left">Sort By</strong>
                <ul>
                    <li onClick={sortByPriceAsc}><a href="#">Price -- Low High</a></li>
                    <li onClick={sortByPriceDsc}><a href="#">Price -- High Low</a></li>
                    <li onClick={sortByDiscount}><a href="#">Discount -- Hight Low</a></li>
                </ul>
            </>
        )
    }
}
const mapStateToProps = (state) => ({ items: state.items });

export default connect(mapStateToProps)(Sorting);