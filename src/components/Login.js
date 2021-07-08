import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)

        this.state = {
            username: '',
            password: '',
            submitted: false,
            isLoggedIn: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        const { username, password } = this.state;
        if (username && password) {
            axios.post('http://localhost:5000/login', {
                username: username,
                password: password
            })
                .then(res => {

                    console.log(res.data)
                    if (res.data.auth === true) {

                        //localStorage.setItem('auth', res.data.id)
                        this.props.history.push('/')
                        this.props.setIsLoggedIn(true)
                        this.props.setUserId(res.data.id)
                    }
                    else {
                        alert("Wrong credintials")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="container">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>

                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;

