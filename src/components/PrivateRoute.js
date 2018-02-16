import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        const {component: Component, auth: isAuthenticated, ...resetProps} = this.props;
        return (
            <Route {...resetProps} render={(props) => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: {from: props.location } }}/>
                )
            )}/>
        );
    }
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default PrivateRoute;
