import React, { useState, useEffect } from 'react';
import './styles.css';

function Home() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
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