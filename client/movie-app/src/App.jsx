import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import MyList from "./pages/MyList"
import { Toaster } from "react-hot-toast";

const queryClient=new  QueryClient({})

const routes=(
  <Router>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/signin" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/mylist" element={<MyList/>} />
    </Routes>
  </Router>
)

function App() {

  return (
    <>
    <div>
      <Toaster position="top-center" />
      <QueryClientProvider client={queryClient}>
      {routes}
      </QueryClientProvider>
    </div>
    </>
  )
}

export default App
