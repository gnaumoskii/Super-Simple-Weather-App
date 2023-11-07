'use client';
import WeatherPageContent from './components/WeatherPageContent/WeatherPageContent';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function Home() {

  return (
    <main className="">
      <QueryClientProvider client={queryClient}>
      <WeatherPageContent />
      </QueryClientProvider>
    </main>
  )
}
