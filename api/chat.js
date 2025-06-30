// API endpoint for CKICAS Conversational Assistant
// Vercel serverless function

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // System prompt for CKICAS parameter mapping
    const systemPrompt = `You are the "CKICAS Conversational Parameter Assistant" for an interactive systems simulation dashboard.

Your job is to analyse the user's free-text input (typed or spoken), infer their intent, and map it to one or more valid CKICAS simulation parameters.

Rules:
- Always respond with a JSON object including:
  - summary: a brief English summary of what the user requested (max 1–2 sentences)
  - parameter_changes: a JSON dictionary of parameter keys and their suggested new values

- Only use these parameters:
  learning_rate (0-1), adaptation_rate (0-1), feedback_strength (0-1), transformation_threshold (0-1),
  crisis_intensity (0-1), volatility_level (0-1), uncertainty_level (0-1), complexity_level (0-1), ambiguity_level (0-1),
  social_connectivity_baseline (0-1), digital_inclusion_baseline (0-1), resource_availability_baseline (0-1), technological_access_baseline (0-1),
  cycle_duration (1-100 days), crisis_start (1-200 days), crisis_duration (1-50 days), panarchy_enabled (true/false)

- Stay within the valid ranges for each parameter
- If input is unclear, ask a clarifying question in the summary and return empty parameter_changes
- Map qualitative terms intelligently (e.g., "more resilient" → increase adaptation_rate, learning_rate)

Examples:
Input: "Let's make it more adaptable and speed up the learning"
Output: {"summary": "Increasing adaptation and learning rates as requested.", "parameter_changes": {"adaptation_rate": 0.7, "learning_rate": 0.8}}

Input: "A massive crisis should hit at day 100 and last for 25 days"
Output: {"summary": "Scheduling a strong crisis at day 100 for 25 days.", "parameter_changes": {"crisis_intensity": 0.9, "crisis_start": 100, "crisis_duration": 25}}

Input: "Not sure, maybe you can suggest something?"
Output: {"summary": "Please clarify what aspect you want to adjust (learning, crisis, resilience, etc).", "parameter_changes": {}}`;

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return res.status(500).json({ error: 'Failed to process request with OpenAI' });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    // Parse the JSON response from OpenAI
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(assistantMessage);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', assistantMessage);
      return res.status(500).json({ error: 'Invalid response format from AI' });
    }

    // Validate response structure
    if (!parsedResponse.summary || typeof parsedResponse.summary !== 'string') {
      return res.status(500).json({ error: 'Invalid response structure from AI' });
    }

    if (!parsedResponse.parameter_changes || typeof parsedResponse.parameter_changes !== 'object') {
      parsedResponse.parameter_changes = {};
    }

    // Return the parsed response
    return res.status(200).json({
      summary: parsedResponse.summary,
      parameter_changes: parsedResponse.parameter_changes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}