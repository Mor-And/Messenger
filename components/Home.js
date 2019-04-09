import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Scroller from './Scroller';

import socketIO from 'socket.io-client';

import styles from './styles.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { List, ListItem } from '@material-ui/core';

const socket = socketIO('localhost:3001');

const limit = 10;

const Home = () => {

    const [input, setInput] = useState('');
    const [messagesResponse, setMessagesResponse] = useState({});
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState({});
    const [status, setStatus] = useState(false);


    useEffect(() => {
        socket.emit('getMessages', { limit: limit, offset: 0 });
        socket.on('messages', (data) => {
            setMessagesResponse({ ...data })
        })
        socket.on('newMessage', (data) => {
            if (data) {
                setNewMessage({ ...data });
            }
        })
        return () => { }
    }, [])


    useEffect(() => {
        setMessages({ ...messages, ...messagesResponse })
        setTimeout(() => setStatus(false), 300)
        return () => { }
    }, [messagesResponse])

    useEffect(() => {
        if (Object.keys(newMessage).length > 0)
            setMessages({ ...newMessage, ...messages })
        return () => { }
    }, [newMessage])


    const sendMessage = () => {
        socket.emit('newMeassage', { 'message': input })
        setInput('');
    }

    const loadItems = () => {
        if (messages && !status) {
            socket.emit('getMessages', { limit: limit, offset: Object.keys(messages).length });
            setStatus(true);
        }
    }

    return (
        <div className="messenger">
            <div className="messagesWrap">
                <Scroller
                    loadMore={loadItems}
                    hasMore={(Object.keys(messagesResponse).length % limit == 0 && !status) || false}
                    className="messageArea"
                >
                    {
                        messages && Object.keys(messages).length > 0 &&
                        Object.keys(messages).map(key => {
                            return (
                                <ListItem className="messageBlock" key={key}>
                                    {messages[key]}
                                </ListItem>
                            )
                        })
                    }
                </Scroller>
            </div>

            <div className="sendBox">
                <TextField
                    variant="outlined"
                    multiline
                    margin="normal"
                    className="textArea"
                    rowsMax="2"
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

                </TextField>

                <Button
                    variant="contained"
                    color="primary"
                    className="sendBtn"
                    onClick={sendMessage}
                >
                    Send
                    <SendIcon className="send-icon" />
                </Button>
            </div>

        </div >
    )
}

export default withStyles(styles)(Home)