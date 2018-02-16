import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavItem from "../NavItem";

class Header extends Component {
    render() {
        const {auth: isAuthenticated} = this.props;
        return (
            <header style={{marginBottom: '50px'}}>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <Link className="navbar-brand" to="/">Fixed navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <NavItem to="/" exact={true}>Home</NavItem>
                            <NavItem to="/about">About</NavItem>
                            <NavItem to="/contact">Contact</NavItem>
                        </ul>
                        {
                            isAuthenticated
                            ? (
                                <div className="form-inline mt-2 mt-md-0">
                                    <Link to="/user-panel" className="btn btn-success">User panel</Link>
                                    <Link to="/logout" className="btn btn-warning" style={{marginLeft: '5px'}}>Logout</Link>
                                </div>
                            ) : (
                                <div className="form-inline mt-2 mt-md-0">
                                    <Link to="/login" className="btn btn-primary">Login</Link>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;