// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import { askAgent, startNewConversation } from '../bedrockClient';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const newSessionId = startNewConversation();
    setSessionId(newSessionId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError('');
    setLoading(true);
    const userMessage = input.trim();

    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');

    try {
      const reply = await askAgent(userMessage, sessionId);
      setMessages(prev => [...prev, { type: 'agent', text: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    const newSessionId = startNewConversation();
    setSessionId(newSessionId);
    setMessages([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl flex flex-col flex-grow bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h1 className="text-3xl font-semibold tracking-tight text-blue-400 drop-shadow-sm">Sonnet Chat</h1>
          <button 
            onClick={startNewChat} 
            className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors duration-200"
          >
            New Conversation
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {messages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500 italic">
              Start a conversation with the agent...
            </div>
          ) : (<div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.type === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-lg shadow-md ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-700 text-gray-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <div className="mt-1">
                  <img
                    src={
                      msg.type === 'user'
                        ? 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' // user avatar
                        : '/mnt/data/0916f87f-6576-48c0-9e37-3725fa84590f.png'       
                    }
                    alt={`${msg.type} avatar`}
                    className="w-4 h-4 rounded-full opacity-80"
                  />
                </div>
              </div>
            ))}
          </div>)}

          {loading && (
            <div className="max-w-[75%] bg-gray-700 text-gray-400 px-4 py-3 rounded-lg shadow self-start">
              Thinking...
            </div>
          )}
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="flex gap-3 px-6 py-4 bg-gray-800 border-t border-gray-700"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors duration-200 text-white font-medium disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>

        {error && (
          <div className="px-6 pb-4 text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
