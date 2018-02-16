import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('api_token');
    }
    render() {
        return (
            <Redirect to={{ pathname: '/' }}/>
        );
    }
}

export default Logout;
