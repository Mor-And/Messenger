import React, { useState, useEffect } from 'react';

function MessageArea() {
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
        </div>
    )
}

export default MessageArea