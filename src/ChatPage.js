import './ChatPage.css';

import React, { useEffect, useState } from "react"
// import Signup from './Signup.jsx';

import { useParams } from 'react-router-dom';


function ChatPage() {
    const [userValue, setUserValue] = useState("")
    const [chatLog, setChatLog] = useState([
    ])

    const isEmpty = !chatLog.length
    console.log("chatLog:", chatLog)
    console.log("isEmpty:", isEmpty)

    const { username } = useParams();

    useEffect(() => {
        const greetingSubject = username ? `${username}` : "there"
        console.log("Greeting subject: ", greetingSubject)
        const defaultResponse = {
            role: "system",
            content: `Hey, ${greetingSubject}! Welcome to our AI powered emotional support chatbot. I'm here to assist you. Feel free to share anything you are comfortable to share with me. `,
        }
        setChatLog([defaultResponse]);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault()

        const clientMessage = { role: "user", content: userValue }

        fetch('https://server-lyxo.onrender.com/login', {
        // To debug and test locally, use this line instead
        // fetch('http://localhost:3001/chat', {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clientMessage }),
        })
            .then(response => {
                if (response.ok) {
                    // Successful response (status code 200)
                    return response.json().then(data => {
                        console.log('API return:', data);
                        setChatLog((current) => [...current, clientMessage, data.completion])
                        console.log("chatLog:", chatLog)
                    });
                } else {
                    // Unsuccessful response (status code 401)
                    console.log('Chat API call failed');
                    throw new Error('Chat API call failed');
                }
            })
            .catch(error => {
                console.error('Error during chat API call:', error);
                // Handle the error here, such as displaying an error message to the user
            });
    }

    // const registerUser = () => {
    //     // if (username) {
    //     //     // alert(`Registration successful! Username: ${username}, password: ${password}`);

    //     // } else {
    //     //     alert("Please enter a username.");
    //     // }

    //     if (username && password) {
    //         fetch('http://localhost:8080/api/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 first_name: username,
    //                 password: password,
    //             }),
    //         })
    //             .then(response => {
    //                 if (response.ok) {
    //                     alert('Registration successful!');
    //                 } else {
    //                     throw new Error('Registration failed.');
    //                 }
    //             })
    //             .catch(error => {
    //                 alert(error.message);
    //             });
    //     } else {
    //         alert('Please enter a username and password.');
    //     }
    // };



    return (
        <div className="main">
            <h1>Your Personal AI Assistant</h1>
            {/* <a href="/Signup">Sign up</a> */}
            <div className="log">
                <ul>
                    {chatLog.map((chat, idx) =>
                        chat.role === "user" ? (
                            <li key={idx}>

                                <span>{chat.content}</span>
                            </li>
                        ) : (
                            <li key={idx}>

                                <span>{chat.content}</span>
                            </li>
                        )
                    )}

                    {isEmpty && <h2>Tell me how do you feel?</h2>}
                </ul>
            </div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="prompt"
                    placeholder="😺 How can I help you... "
                    value={userValue}
                    onChange={(e) => setUserValue(e.target.value)}
                />
                <button type="submit"> ➤ Send </button>
            </form>
            <footer>
                <p>© 2023 HearMeOut. All rights reserved.</p>
            </footer>
        </div>

    )
}

export default ChatPage;
