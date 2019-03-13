import React, { useState, useEffect, } from 'react';
import './styles.css';

function Home() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/messages', { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else
                    throw 'Not 200'
            })
            .then(data => setMessages(data.messages))
            .catch(
                err => console.log(err)
            );
        return () => {
        };
    }, []);

    const sendMessage = () => {
        fetch('http://localhost:3001/send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else
                    throw 'Not 200'
            })
            // .then(data => console.log(data.answer))
            .catch(
                err => console.log(err)
            );
        if (input) {
            setMessages([...messages, input]);
            setInput('');
        }
    }

    return (
        <div className="messenger">

            <div className="messageArea">
                {
                    messages &&
                    messages.map((item, key) => {
                        return (
                            <div className="messageBlock" key={key}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>

            <div className="sendBox">
                <input
                    type="textarea"
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => {
                        if (e.key == 'Enter') {
                            sendMessage();
                        }
                    }
                    }
                    value={input}
                >
                </input>
                <button
                    onClick={() => sendMessage()}
                >
                    Send
                </button>
            </div>

        </div>
    )
}

export default Home