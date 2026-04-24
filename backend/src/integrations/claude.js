const generateMessage = async (input) => {
  const apiKey = process.env.CLAUDE_API_KEY;
  
  if (!apiKey) {
    // If no API key, return a mock response for development
    return `[Mock AI Message]: Hey! Just wanted to let you know about: ${input}. Come visit our store today!`;
  }

  try {
    const response = await fetch(
      'https://api.anthropic.com/v1/messages',
      {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 1024,
          messages: [
            { role: 'user', content: `Write a short, engaging SMS marketing message for customers based on this input. Keep it under 160 characters: ${input}` }
          ]
        })
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Claude API error');
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error.message);
    throw new Error('Failed to generate AI message');
  }
};

module.exports = {
  generateMessage,
};
