import React, { useState, useEffect, } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import socketIO from 'socket.io-client';

import './styles.css';

const socket = socketIO('localhost:3001');


const Home = class extends React.Component {
    state = {
        input: '',
        messages: [],
        newMessage: ''
    }

    componentDidMount = () => {
        socket.emit('getMessages');
        socket.on('messages', (data) => {
            this.setState({ ...this.state, messages: data.reverse() })
        })
    }

    componentDidUpdate() {
        const { messages, newMessage } = this.state;

        if (newMessage) {
            socket.on('newMessage', (data) => {
                console.log(123);
                if (data) {
                    this.setState({ messages: [...messages, data], newMessage: '' });
                }
            })
        }
        else {
            socket.off('newMessage')
        }
    }

    sendMessage = () => {
        const { input } = this.state;

        socket.emit('newMeassage', { 'message': input })
        this.setState({ ...this.state, newMessage: input, input: '' });
    }

    render() {
        const { messages, input } = this.state;
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
                        onChange={e => this.setState({ ...this.state, input: e.target.value })}
                        onKeyPress={e => {
                            if (!e.ctrlKey) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    this.sendMessage();
                                }
                            }
                            else {
                                if (e.charCode === 13) {
                                    this.setState({ ...this.state, input: input + '\n' })
                                }
                            }
                        }
                        }
                        value={input}
                    >
                    </textarea>
                    <button
                        onClick={() => this.sendMessage()}
                    >
                        Send
                    </button>
                </div>

            </div>
        )
    }



}

const mapStateToProps = function (state) {
    return {}
}

export default connect(mapStateToProps)(Home)