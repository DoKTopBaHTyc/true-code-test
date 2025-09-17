import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductPage from './pages/ProductPage'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductListPage/>} />
        <Route path='/products/:id' element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
