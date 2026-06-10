import '@fontsource/inter/400.css'  // Regular
import '@fontsource/inter/600.css'  // Semibold  
import '@fontsource/inter/700.css'  // Bold
import '@fontsource/poppins/600.css' // Heading
import '@fontsource/poppins/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import App from './App'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)