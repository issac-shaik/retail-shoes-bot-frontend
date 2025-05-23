import { v4 as uuid } from 'uuid';

// Store session ID outside the function so it persists
let currentSessionId = null;

/**
 * Sends userText to an Amazon Bedrock Agent and returns the reply.
 * All config comes from Vite env vars that start with VITE_*
 */
export async function askAgent(userText, sessionId = null) {
  // Use provided sessionId or create a new one if this is a new conversation
  if (!sessionId && !currentSessionId) {
    currentSessionId = uuid();
    console.log('Created new session ID:', currentSessionId);
  }
  
  // Use the session ID that was passed in, or the persistent one
  const useSessionId = sessionId || currentSessionId;
  
  // 1. Load SDK modules at runtime (avoids Vite export errors)
  const {
    BedrockAgentRuntimeClient,
    InvokeAgentCommand,
  } = await import('@aws-sdk/client-bedrock-agent-runtime');
  
  // 2. Build the client with direct credential object
  const REGION = import.meta.env.VITE_REGION;
  
  // Direct credential object - simpler approach
  const client = new BedrockAgentRuntimeClient({
    region: REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  });

  // 3. Prepare and send the command
  const command = new InvokeAgentCommand({
    agentId: import.meta.env.VITE_AGENT_ID,
    agentAliasId: import.meta.env.VITE_AGENT_ALIAS_ID,
    sessionId: useSessionId,
    inputText: userText,
  });

  try {
    const response = await client.send(command);

    // 4. Stream back the agent's reply
    const decoder = new TextDecoder('utf-8');
    let full = '';
    for await (const chunk of response.completion) {
      full += decoder.decode(chunk.chunk.bytes);
    }
    return full;
  } catch (err) {
    console.error('Bedrock invoke error ➜', err);
    console.error('Error details:', {
      name: err?.name,
      message: err?.message
    });
    
    // Re-throw with more specific error message
    throw new Error(
      err?.name === 'AccessDeniedException'
        ? '⚠️ Bedrock denied the request (check IAM policy or region).'
        : err.message || 'Unknown Bedrock error'
    );
  }
}

// Function to start a new conversation (reset session ID)
export function startNewConversation() {
  currentSessionId = null;
  return uuid();
}