// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import { askAgent, startNewConversation } from '../bedrockClient';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Initialize session when component mounts
  useEffect(() => {
    // Generate a new session ID
    const newSessionId = startNewConversation();
    setSessionId(newSessionId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setError('');
    setLoading(true);
    
    // Add user message to chat history
    const userMessage = input.trim();
    setMessages(prevMessages => [...prevMessages, { type: 'user', text: userMessage }]);
    setInput(''); // Clear input

    try {
      // Send message to Bedrock agent
      const reply = await askAgent(userMessage, sessionId);
      
      // Add agent response to chat history
      setMessages(prevMessages => [...prevMessages, { type: 'agent', text: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    // Reset everything
    const newSessionId = startNewConversation();
    setSessionId(newSessionId);
    setMessages([]);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <div className="max-w-3xl w-full mx-auto flex flex-col flex-grow">
        <h1 className="text-2xl font-bold mb-4">Bedrock Agent Chat</h1>
        
        <button 
          onClick={startNewChat} 
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded self-end"
        >
          New Conversation
        </button>
        
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto bg-white rounded-lg p-4 mb-4 shadow">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Start a conversation with the agent...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-100 ml-auto max-w-[80%]' 
                      : 'bg-gray-100 mr-auto max-w-[80%]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}
              
              {loading && (
                <div className="bg-gray-100 p-3 rounded-lg mr-auto max-w-[80%]">
                  <p className="text-gray-500">Thinking...</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 rounded border border-gray-300"
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
        
        {/* Error display */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-800 p-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;