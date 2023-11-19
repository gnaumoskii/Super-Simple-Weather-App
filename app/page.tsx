'use client';
import WeatherPageContent from './components/WeatherPageContent/WeatherPageContent';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen relative overflow-hidden">
      <div className='z-[10]'>
        <QueryClientProvider client={queryClient}>
        <WeatherPageContent />
        </QueryClientProvider>
      </div>

    </main>
  )
}
