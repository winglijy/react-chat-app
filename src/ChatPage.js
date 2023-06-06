// import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import './ChatPage.css';

// import { CreateImageRequestResponseFormatEnum } from 'openai'
import React, { useEffect, useState } from "react"
// import Signup from './Signup.jsx';

import { useParams } from 'react-router-dom';

// dotenv.config();

const openAiConfig = new Configuration({
    // apiKey: process.env.REACT_APP_OPEN_AI_KEY 
    apiKey: "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"
});
const openAi = new OpenAIApi(openAiConfig);


function ChatPage() {
    //   const [chatLog, setChatLog] = useState([]);
    //   const [userValue, setUserValue] = useState('');
    //   const [isEmpty, setIsEmpty] = useState(true);

    //   const onSubmit = async (e) => {
    //     e.preventDefault();

    //     // Handle form submission and API call
    //     // ...

    //     // Update chatLog, userValue, and isEmpty states as needed
    //     // ...

    //     // Clear the input field
    //     setUserValue('');
    //   };

    //   return (
    //     <div>
    //       <h1>Chat</h1>

    //       <div className="log">
    //         <ul id="chat-list">
    //           {/* Render chatLog content */}
    //           {chatLog.map((chat, idx) => (
    //             <li key={idx}>
    //               <span>{chat.role === 'user' ? chat.content : chat.content}</span>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       <form onSubmit={onSubmit}>
    //         <input
    //           type="text"
    //           name="prompt"
    //           placeholder="😺 How can I help you..."
    //           id="userchat-input"
    //           value={userValue}
    //           onChange={(e) => setUserValue(e.target.value)}
    //         />
    //         <button type="submit"> ➤ Send </button>
    //       </form>
    //     </div>
    //   );
    const [userValue, setUserValue] = useState("")
    const [chatLog, setChatLog] = useState([
    ])

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

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

        const chatCompletion = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are empathetic listerner, and a Cognitive Behavioral Therapist, your kind and open approach to CBT allows users to confide in you. You ask questions one by one and collect the user's responses to implement the following steps of CBT. Help the user identify troubling situations or conditions in their life. Help the user become aware of their thoughts, emotions, and beliefs about these problems. Using the user's answers to the questions, you identify and categorize negative or inaccurate thinking that is causing the user anguish into one or more of the following CBT-defined categories. Using the user's answers, you ask them to reframe their negative thoughts with your expert advice. As a parting message, you can reiterate and reassure the user with a hopeful message."
                },
                clientMessage
            ],
            temperature: 0.7
        });

        const openAI_return = chatCompletion.data.choices[0].message
        console.log("openAI return:", openAI_return)

        // const openAI_return = { role: "Assistant", content: "fake return" } // "fake return"
        setChatLog((current) => [...current, clientMessage, /*data.completion*/ openAI_return])
        console.log("chatLog:", chatLog)
        setUserValue("")
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
