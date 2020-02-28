import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, getProductList } from '../actions/cartActions';
import Sorting from './Sorting';
import RangeSlider from './RangeSlider';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/qzuzi')
            .then(res => res.json())
            .then((data) => {
                this.props.getProductList(data);
            })
            .catch(console.log)            
    }

    componentDidUpdate(prevState){
        if(prevState.items !== this.props.items){
            this.setState({
                items: this.props.items
            })
        }
    }

    rangePriceFilter = (val) => {
        let filteredData = [];
        filteredData = this.state.items.filter((item) => {
            return item.price >= val.min && item.price <= val.max
        })
        this.setState({
            items: filteredData
        });
    }

    sortByPriceAsc = () => {
        let sortedProductsAsc;
        sortedProductsAsc = this.state.items.sort((a, b) => {
            return parseInt(a.price) - parseInt(b.price);
        })
        this.setState({
            items: sortedProductsAsc
        })
    }

    sortByPriceDsc = () => {
        let sortedProductsDsc;
        sortedProductsDsc = this.state.items.sort((a, b) => {
            return parseInt(b.price) - parseInt(a.price);
        })
        this.setState({
            items: sortedProductsDsc
        })
    }

    sortByDiscount = () => {
        let sortedProductDiscount;
        sortedProductDiscount = this.state.items.sort((a, b) => {
            return parseInt(b.discount) - parseInt(a.discount);
        })
        this.setState({
            items: sortedProductDiscount
        })
    }

    render() {
        let itemList = this.state.items.map(item => {
            return (
                <div className="col-sm-4 mb-4" key={item.id}>
                    <div className="card">
                        <img src={item.img_url} alt={item.category} className="img-fluid" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="price-row clearfix">
                                <div className="priceWithDiscount float-left">&#8377;{item.price - ((item.price * item.discount) / 100)}</div>
                                <div className="price float-left">{item.price}</div>
                                <div className="discount text-right">{item.discount}% off</div>
                            </div>
                        </div>
                        <div className="text-center mb-3">
                            <button className="btn btn-primary" onClick={() => { this.props.addToCart(item.id) }}>Add to Cart</button>
                        </div>
                    </div>
                </div>

            )
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"><h5 className="mt-4">Filters</h5></div>
                    <div className="col-sm-9">
                        <Sorting sortByPriceAsc={this.sortByPriceAsc} sortByPriceDsc={this.sortByPriceDsc} sortByDiscount={this.sortByDiscount} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <RangeSlider rangePriceFilter={this.rangePriceFilter} />
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            {itemList}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductList: (items) => {
            dispatch(getProductList(items))
        },
        addToCart: (id) => {
            dispatch(addToCart(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)