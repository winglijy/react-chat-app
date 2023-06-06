
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import logo from './images/logo.jpg';


function LoginPage() {
    const email = '';

    return (
        <div className="login-page">
            <header className="header">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/chat">Chat</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <h1>User Login</h1>
        
            <section div className="loginform">
                <div className="form-body">
                    <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input type="email" id="email" className="form__input" value={email} placeholder="Email" />
                    </div>
                    <div className="password">
                        <label className="form__label" for="password">Password </label>
                        <input className="form__input" type="password" id="password" placeholder="Password" />
                    </div>
                    <div className="loginbutton">
                        <button type="submit" class="btn" >Login</button>
                    </div>
                </div>
            </section>
            <footer>
                    <p>© 2023 HearMeOut. All rights reserved.</p>
                </footer>
        </div>
    );
};
export default LoginPage;
