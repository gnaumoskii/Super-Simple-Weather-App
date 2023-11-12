'use client';
import { useState } from 'react';
import WeatherPageContent from './components/WeatherPageContent/WeatherPageContent';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen relative">
      <QueryClientProvider client={queryClient}>
      <WeatherPageContent />
      </QueryClientProvider>
    </main>
  )
}
