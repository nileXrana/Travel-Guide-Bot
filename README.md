# Travel Assistant Chatbot

A simple travel assistance chatbot web app built with Next.js and Tailwind CSS.

## Features

- Chat interface with user input and assistant response bubbles
- Travel destination input with autocomplete suggestions
- Dark/light mode toggle
- Loading animation while waiting for responses
- Chat history stored in React state
- Option to clear chat

## Technology Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- OpenAI GPT-3.5 API (with mock API fallback)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/travel-assistance.git
cd travel-assistance
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

> Note: If you don't provide an API key, the app will use mock responses for development.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a travel destination in the location input field or select from suggestions
2. Type your travel-related questions in the chat input
3. Get instant responses about destinations, tips, local food, etc.
4. Toggle between dark and light mode using the button in the navigation bar
5. Clear chat history with the "Clear Chat" button

## License

MIT 