import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient=new  QueryClient({})

const routes=(
  <Router>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  </Router>
)

function App() {

  return (
    <>
    <div>
      <QueryClientProvider client={queryClient}>
      {routes}
      </QueryClientProvider>
    </div>
    </>
  )
}

export default App
