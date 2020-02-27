import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



const Navbar = ({ addedItems }) => {
    console.log(addedItems);
    const totalQty = addedItems.length !== 0 && addedItems.map(o => o.quantity).reduce((a, c) => { return a + c })
    return (
        <nav className="nav-wrapper mb-3">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <Link to="/" className="brand-logo"><i className="fa fa-home" aria-hidden="true"></i></Link>
                    </div>
                    <div className="col-sm-9">
                        <span className="float-right headerRight"><i className="fa fa-search" aria-hidden="true"></i><Link to="/cart"><i className="fa fa-shopping-cart"></i><sup style={{ color: 'white' }}>{totalQty}</sup></Link></span>                        
                    </div>
                </div>
            </div>
        </nav>


    )
}

const mapStateToProps = (state) => ({ addedItems: state.addedItems });

export default connect(mapStateToProps)(Navbar);