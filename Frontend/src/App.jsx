import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const app = createBrowserRouter([
    {
      element: <Home />,
      path: '/'

    }
  ])

  return (
    <div>
      <RouterProvider router={app} />
    </div>
  )
}

export default App
