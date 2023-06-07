import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.jpg';
import product from './images/product.png';
import icon from './images/icon.png';
import icon2 from './images/icon2.png';
import icon3 from './images/icon3.png';
import './HomePage.css';


function HomePage() {
    const loginButtonRef = useRef(null);
    const [authenticatedUser, setAuthenticatedUser] = useState("")

    useEffect(() => {
        const loginButton = loginButtonRef.current;

        const handleLoginClick = () => {
            // Handle the login button click event
            console.log("Login button clicked")

            const usernameInput = document.querySelector('.username-input');
            const passwordInput = document.querySelector('.password-input');

            const username = usernameInput.value;
            const password = passwordInput.value;

            // TODO: Implement login logic using the username and password values
            console.log("Username:", username);
            console.log("Password:", password);

            // fetch('https://www-hearmeout-com.onrender.com/login', {
            fetch('https://server-lyxo.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => {
                    if (response.ok) {
                        // Successful response (status code 200)
                        return response.text().then(data => {
                            console.log('Login data:', data);
                            setAuthenticatedUser(username); // Call setAuthenticatedUser with the username
                            // Navigate to chat page
                            console.log('Authenticated user:', username);
                            const navLink = `/chat/${username || ''}`;
                            console.log('navLink:', navLink);
                            window.location.href = navLink;
                        });
                    } else {
                        // Unsuccessful response (status code 401)
                        console.log('Login failed');
                        setAuthenticatedUser('');
                        throw new Error('Login failed');
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    // Handle the error here, such as displaying an error message to the user
                });


        };

        loginButton.addEventListener('click', handleLoginClick);

        return () => {
            loginButton.removeEventListener('click', handleLoginClick);
        };
    }, []);

    return (
        <div className="homepage">

            {/* <Link to="/chat">Go to Chat</Link> */}
            <header className="homepage-header">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="header-right">
                    {/* <button className="signup-button">Sign Up</button> */}


                    <br />
                    <input type="text" placeholder="Username" className="username-input" />
                    <input type="password" placeholder="Password" className="password-input" />
                    <button ref={loginButtonRef} className="login-button">Log In</button>
                </div>
            </header>
            <h1>Your Personal AI Assistant</h1>
            <main>
                <section className="product-highlights">
                    {/* // <h1 className="title">Your Personal Emotional Support Assistant</h1> */}
                    <img src={product} alt="Product Illustration" className="product-illustration" />
                    <p className="powered-by">
                        Powered By OpenAI <Link to={`/chat/${authenticatedUser || ''}`}>Chat now!</Link>
                    </p>
                    <p className="signup">
                        <Link to={`/signup`}>Sign up to explore more!</Link>
                    </p>
                    <p className="access-text">Access to Our AI Powered Chatbot to Experience</p>
                    <div className="product-values">
                        <div className="product-value">
                            <img src={icon} alt="Compassionate Support Icon" className="icon" />
                            <h2>24/7 Compassionate Support at No Cost</h2>
                        </div>
                        <div className="product-value">
                            <img src={icon2} alt="Release Thoughts Icon" className="icon" />
                            <h2>An outlet for releasing negative thoughts and emotions in real-time</h2>
                        </div>
                        <div className="product-value">
                            <img src={icon3} alt="Non-Judgmental Space Icon" className="icon" />
                            <h2>A Non-Judgmental Space for Authentic Expression</h2>
                        </div>
                    </div>
                </section>
                <footer>
                    <p>© 2023 HearMeOut. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
}

export default HomePage;
