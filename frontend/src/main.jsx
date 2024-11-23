import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* below doen so that we hcoulld have diff route sin our application */}
    <BrowserRouter>  
    <App />
    </BrowserRouter>
    
  </React.StrictMode>,
)
