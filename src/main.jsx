import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataContextHandler } from './Context/DataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextHandler>
    <App />
    </DataContextHandler>
  </React.StrictMode>,
)
