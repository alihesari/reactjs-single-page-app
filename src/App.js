import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/css/bootstrap.min.css';
import axios from 'axios';

// Components
import Header from './components/includes/Header';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Product from "./components/pages/Product";
import Login from "./components/pages/Login";
import NoMatch from "./components/pages/NoMatch";
import UserPanel from "./components/pages/UserPanel";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/pages/Logout";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true
        }
    }

    componentDidMount() {
        let apiToken = localStorage.getItem('api_token');
        if(apiToken !== null) {
            axios.get(`http://roocket.org/api/user?api_token=${apiToken}`)
                .then(response => {
                    this.setState({isAuthenticated: true});
                })
                .catch(error => {
                    this.setState({isAuthenticated: false});
                });
        } else {
            this.setState({isAuthenticated: false});
        }
    }
    render() {
        return (
            <div>
                <Header auth={this.state.isAuthenticated}/>
                <main role="main" className="container" style={{paddingTop: 60}}>
                    <Switch>
                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/product/:id" component={Product}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <PrivateRoute path="/user-panel" component={UserPanel} auth={this.state.isAuthenticated}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;