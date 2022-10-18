import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageHello, PageHome } from "./components";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<PageHome />} />
        <Route path='/hello' element={<PageHello />} />
      </Routes>
    </BrowserRouter>
  )
}