import React, {Component} from 'react';
import validator from 'validator';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields : {
                email: '',
                password: ''
            },
            errors: {}
        }
    }

    handleValidation(callback) {
        let {fields} = this.state;
        let errors = {};
        let formIsValid = true;

        if(validator.isEmpty(fields.email)){
            formIsValid = false;
            errors["email"] = "Email is required.";
        } else if(! validator.isEmail(fields.email)) {
            formIsValid = false;
            errors["email"] = "Email format is wrong.";
        }

        if(validator.isEmpty(fields.password)){
            formIsValid = false;
            errors["password"] = "Password is required.";
        } else if(! validator.isLength(fields.password, {min: 6, max: undefined})) {
            formIsValid = false;
            errors["password"] = "The minimum password length should be 6 characters long.";
        }
        this.setState({errors},() => {
            return callback(formIsValid);
        });
    }

    handleRequest() {
        const {email, password} = this.state.fields;

        let data = new FormData();
        data.append('email', email);
        data.append('password', password);

        axios.post('http://roocket.org/api/login', data
        ).then(response => {
            localStorage.setItem('api_token', response.data.data.api_token);
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleValidation((valid) => {
            if(valid) this.handleRequest();
        });
    }

    handleChange(event) {
        let fields = this.state.fields;
        let target = event.target;
        fields[target.name] = target.value;
        this.setState({fields});
    }

    render() {
        const {email, password} = this.state.fields;
        const {errors} = this.state;
        return (
            <div style={{width:'320px', margin:'30px auto',textAlign:'center'}}>
                <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="invalid-feedback"
                         style={{display: (errors["email"] || errors["password"])? 'block': 'none',marginBottom:'30px'}}>
                        <div>{errors["email"]}</div>
                        <div>{errors["password"]}</div>
                    </div>
                    <img
                        className="mb-4"
                        src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg"
                        alt="Bootstrap" width="72" height="72"
                    />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        style={{borderBottomLeftRadius:"0",borderBottomRightRadius:0}}
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        autoFocus=""
                        value={email}
                        onChange={this.handleChange.bind(this)}
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        style={{borderTopLeftRadius:"0",borderTopRightRadius:"0"}}
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange.bind(this)}
                    />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
            </div>
        );
    }
}

export default Login;
