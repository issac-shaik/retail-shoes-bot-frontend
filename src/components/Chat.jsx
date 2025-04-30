// src/components/Chat.jsx
import React, { useState } from 'react';
import { askAgent } from '../bedrockClient';

function Chat() {
  const [input, setInput]     = useState('');
  const [response, setResp]   = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoad]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResp('');
    setLoad(true);
    try {
      const reply = await askAgent(input.trim());
      setResp(reply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Ask the Bedrock Agent</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 mb-4"
          placeholder="Ask something…"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Asking…' : 'Ask'}
        </button>
      </form>

      {error && (
        <div className="mt-6 w-full max-w-md bg-red-100 text-red-800 p-4 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
          <p className="whitespace-pre-wrap text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
