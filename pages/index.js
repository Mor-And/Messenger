import React, { useState, useEffect, } from 'react';
import socketIO from 'socket.io-client';

import './styles.css';

const socket = socketIO('localhost:3001');

function Home() {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('getMessages');
        socket.on('messages', (data) => {
            setMessages(data.reverse())
        })
        return () => {
        };
    }, []);

    useEffect(() => {
        socket.on('newMessage', (data) => {
            if (data) {
                setMessages([...messages, data]);
            }
        })

        return () => {
        }
    }, [messages])


    const sendMessage = () => {
        socket.emit('newMeassage', { 'message': input })
        setInput('');
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
                <textarea
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => {
                        if (!e.ctrlKey) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage();
                            }
                        }
                        else {
                            if (e.charCode === 13) {
                                setInput(input + '\n')
                            }
                        }
                    }
                    }
                    value={input}
                >
                </textarea>
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