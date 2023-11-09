'use client';
import { useState } from 'react';
import WeatherPageContent from './components/WeatherPageContent/WeatherPageContent';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-indigo-500 to-sky-200 bg-no-repeat min-h-screen">
      <QueryClientProvider client={queryClient}>
      <WeatherPageContent />
      </QueryClientProvider>
    </main>
  )
}
