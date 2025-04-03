import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <div className='dark:bg-gray-900 dark:text-white h-[100vh]'>
      <App />
    </div>
)
