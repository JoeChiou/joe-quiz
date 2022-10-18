import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageHello, PageHome } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<PageHome />} />
          <Route path='/hello' element={<PageHello />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}