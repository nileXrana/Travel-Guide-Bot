/**
 * Travel assistance chatbot API integration
 * Using Google's Gemini API with proper API key
 */

// Simulate API delay for better UX
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 800));

/**
 * Generate a response to any travel-related query using Google Gemini API
 */
export async function generateChatResponse(message: string): Promise<string> {
  try {
    await mockDelay(); // Add a slight delay for better UX
    
    // Google Gemini API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("No Gemini API key found in environment variables");
      return "Error: No API key found. Please add your Gemini API key to the .env.local file.";
    }
    
    console.log("Using API key:", apiKey.substring(0, 6) + "..." + apiKey.substring(apiKey.length - 4)); // Log partial key for debugging
    
    // Using Google's Gemini API with corrected endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful travel assistant chatbot. Your task is to provide informative, accurate, and helpful responses to all travel-related queries. 

Important formatting instructions:
1. DO NOT use markdown formatting like asterisks (**) for emphasis or headlines
2. Keep responses brief and concise (under 150 words when possible)
3. For listings, use simple numbers and colons (Example: "1: Place name - Brief description")
4. Use plain text formatting only
5. This travel assistant bot is made by Nilesh Rana who is a software developer and travel enthusiast.

User query: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API response received:", !!data); // Log that we got a response
    
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0] && 
        data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected Gemini API response format:', JSON.stringify(data));
      throw new Error('Unexpected Gemini API response format');
    }
        
  } catch (error: any) {
    console.error("Error generating response with Google Gemini API:", error);
    
    // Try alternative model if primary fails
    try {
      console.log("Trying alternative Gemini model...");
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      
      const backupResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful travel assistant chatbot. Your task is to provide informative, accurate, and helpful responses to all travel-related queries. 

Important formatting instructions:
1. DO NOT use markdown formatting like asterisks (**) for emphasis or headlines
2. Keep responses brief and concise (under 150 words when possible)
3. For listings, use simple numbers and colons (Example: "1: Place name - Brief description")
4. Use plain text formatting only
5. This travel assistant bot is made by Nilesh Rana who is a software developer and travel enthusiast.

User query: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      });

      if (!backupResponse.ok) {
        const backupErrorText = await backupResponse.text();
        console.error('Backup Gemini API error:', backupResponse.status, backupErrorText);
        throw new Error(`Backup Gemini API error: ${backupResponse.status}`);
      }

      const backupData = await backupResponse.json();
      console.log("Backup API response received:", !!backupData);
      
      if (backupData.candidates && 
          backupData.candidates[0] && 
          backupData.candidates[0].content && 
          backupData.candidates[0].content.parts && 
          backupData.candidates[0].content.parts[0] && 
          backupData.candidates[0].content.parts[0].text) {
        return backupData.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected backup API response format');
      }
    } catch (backupError: any) {
      console.error("Both Gemini API attempts failed:", backupError);
      return `Error connecting to Google Gemini API. Please try again later. Details: ${error.message || 'Unknown error'}`;
    }
  }
} 