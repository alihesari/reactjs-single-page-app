import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

class NavItem extends Component {
    render() {
        const {to, exact, children} = this.props;
        return (
            <Route path={to} exact={exact} children={({match}) => (
                <li className={['nav-item', match ? 'active' : 'nav-item'].join(' ')}>
                    <Link className="nav-link" to={to}>{children}</Link>
                </li>
            )}/>
        );
    }
}

export default NavItem;
