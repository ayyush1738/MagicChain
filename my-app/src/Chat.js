import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    const response = await axios.post('http://localhost:3002/chat', {
      message: input,
    });
    const newMessages = [
      { text: input, sender: 'user' },
      { text: response.data.reply, sender: 'bot' },
    ];
    if (response.data.image) {
      newMessages.push({
        text: <img src={response.data.image} alt="chart" style={{ maxWidth: '100%' }} />,
        sender: 'bot',
      });
    }

    console.log(response.data.balance)
    setMessages([...messages, ...newMessages]);
    setInput('');
  };

  return (
    <div>
      <div>
        <h1>Chatbot</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your request here"
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default Chatbot;

