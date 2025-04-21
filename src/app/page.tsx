"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import LocationInput from '@/components/LocationInput';
import { ThemeProvider } from '@/components/ThemeContext';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
          <div className="max-w-4xl mx-auto">
            {/* App description */}
            <div className="text-center mb-8 px-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Plan Your Next Adventure with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">AI-Powered</span> Assistance
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Ask about destinations, get travel tips, find local experiences, and more.
                Your personal travel assistant is just a message away.
              </p>
            </div>
            
            {/* Main App */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
              <div className="p-5 md:p-8">
                <LocationInput />
                <ChatInterface />
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} Travel Assistant • Powered by Next.js & OpenAI</p>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
} 