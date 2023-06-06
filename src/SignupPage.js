import React, { useEffect, useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import logo from './images/logo.jpg';

function SignupPage() {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const signupButtonRef = useRef(null);
    // const [authenticatedUser, setAuthenticatedUser] = useState("")

    useEffect(() => {
        const signupButton = signupButtonRef.current;

        const handleSignupClick = () => {
            // Handle the signup button click event
            console.log("Signup button clicked")

            const username = document.querySelector('.form__username').value;
            const email = document.querySelector('.form__email').value;
            const password = document.querySelector('.form__password').value;
            console.log("Username:", username);
            console.log("Email:", email);
            console.log("Password:", password);

            // TODO: Implement signup logic using the username, email and password values
            fetch('http://10.0.0.79:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            })
                .then(response => {
                    if (response.ok) {
                        // Successful response (status code 200)
                        return response.text().then(data => {
                            console.log('Signup data:', data);
                            // Navigate to chat page
                            // window.location.href = "/";
                            const navLink = `/chat/${username || ''}`;
                            console.log('navLink:', navLink);
                            window.location.href = navLink;

                        });
                    } else {
                        // Unsuccessful response (status code 401)
                        console.log('Signup failed');
                        // setAuthenticatedUser('');
                        throw new Error('Signup failed');
                    }
                })
                .catch(error => {
                    console.error('Error during signup:', error);
                    // Handle the error here, such as displaying an error message to the user
                });


        };

        signupButton.addEventListener('click', handleSignupClick);

        return () => {
            signupButton.removeEventListener('click', handleSignupClick);
        };
    }, []);

    // const navigate = useNavigate();
    // navigate('/login');

    return (
        <div className="signup-page">
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
            <h1>User Registration</h1>
            <section>
                <div className="signupform">
                    <div className="form-body">
                        <div className="username">
                            <label className="form__label" for="username">User Name </label>
                            <input className="form__username" type="text" id="username" placeholder="User Name"
                            // value={username}
                            // onChange={(content) => {
                            //     setUsername(content.target.value);
                            //     // alert(`User name just got change to: ${content.target.value}`);
                            // }} 
                            />
                        </div>
                        <div className="email">
                            <label className="form__label" for="email">Email </label>
                            <input type="email" id="email" className="form__email" placeholder="Email"
                            // value={email}
                            // onChange={(content) => {
                            //     setEmail(content.target.value);
                            //     // alert(`User name just got change to: ${content.target.value}`);
                            // }} 
                            />
                        </div>
                        <div className="password">
                            <label className="form__label" for="password">Password </label>
                            <input className="form__password" type="password" id="password" placeholder="Password"
                            // value={password}
                            // onChange={(content) => {
                            //     setPassword(content.target.value);
                            //     // alert(`User name just got change to: ${content.target.value}`);
                            // }} 
                            />
                        </div>
                        <div className="confirm-password">
                            <label className="form__label" for="confirmPassword">Confirm Password </label>
                            <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password" />
                        </div>
                        <div className="signupbutton">
                            <button ref={signupButtonRef} type="submit" className="btn" >
                                Signup
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <p>© 2023 HearMeOut. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default SignupPage;
