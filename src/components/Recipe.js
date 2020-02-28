import React, { Component } from 'react';
import { connect } from 'react-redux';
class Recipe extends Component {

    render() {
        const { totalPrice, totalDiscount, totalCostPrices } = this.props;
        return (
                <div className="cartPrice-container">
                    <div className="totalHeading"><strong>PRICE DETAILS</strong></div>
                    <div className="items clearfix mb-2"><span>{`Price (${this.props.addedItems.length}) Item`}</span> <span>:</span> <span className="float-right">&#8377;{totalPrice}</span></div>
                    <div className="discount clearfix pb-2 border-bottom"><span>Discount</span> <span>:</span> <span className="float-right">&#8377;{totalDiscount}</span></div>
                    <div className="orderTotal clearfix mt-2"><span>Total Payable</span>  <span className="float-right">&#8377;{(totalCostPrices).toFixed(2)}</span></div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}
export default connect(mapStateToProps)(Recipe)
