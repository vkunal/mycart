import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, addQuantity, subtractQuantity } from '../actions/cartActions';
import Recipe from './Recipe';
class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }

    /*@Toatal price for all selected products*/
    totalPrice = () => this.props.items.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
    /*@Total discount from all products*/
    totalDiscount = () => this.props.items.map(item => (item.discount * item.quantity * item.price)/100).reduce((prev, curr) => prev + curr, 0);
    /*@Price after discount for all products*/
    totalCostPrices = () => this.totalPrice() - this.totalDiscount();


    render() {
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (
                        <div className="rowCart mb-2" key={item.id}>
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="clearfix">
                                        <img src={item.img_url} alt={item.img} className="float-left img-fluid" />
                                        <div className="float-left">
                                            <span>{item.name}</span>
                                            <div className="priceDesc">&#8377;{item.price - ((item.price * item.discount) / 100)} <span>{item.price}</span> <span>{item.discount}&#37; off</span></div>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <div className="add-remove">
                                        <Link to="/cart"><span className="plus" onClick={() => { this.handleSubtractQuantity(item.id) }}>-</span></Link>
                                        <span className="border qty">{item.quantity}</span>
                                        <Link to="/cart"><span className="minus" onClick={() => { this.handleAddQuantity(item.id) }}>+</span></Link>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="remove" onClick={() => { this.handleRemove(item.id) }}>Remove</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) :

            (
                <p>Cart is Empty. There are no products in cart.</p>
            )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        {addedItems}
                    </div>
                    <div className="col-sm-3">
                        <Recipe totalPrice={this.totalPrice()} totalDiscount={this.totalDiscount()} totalCostPrices={this.totalCostPrices()} />
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)