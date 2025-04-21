# Travel Assistant

A modern travel assistance chatbot built with Next.js and Tailwind CSS. This application provides travel information, destination recommendations, and trip planning guidance using Google's Gemini API.

## Features

- 🌍 Travel destination recommendations
- 🏨 Accommodation advice and tips
- 🍽️ Local cuisine and dining suggestions
- 🔍 Interactive chat interface
- 🌓 Dark/light mode toggle
- 📱 Fully responsive design
- 🔎 Location search with suggestions
- 🔄 Chat history management

## Technologies Used

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Google Gemini API** - AI chat model
- **TypeScript** - Type safety
- **React Context API** - State management

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/travel-assistant.git
   cd travel-assistant
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Configuration

To use the Google Gemini API:
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Create an API key
3. Add it to your `.env.local` file

## Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

```bash
npm run build
# or
yarn build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
