import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'wouter'
import { createGlobalStyle } from 'styled-components'
import App from './App'

const GlobalStyle = createGlobalStyle`
  html, body, h1, h2 {
    padding: 0;
    margin: 0;
    font-family: "Rokkitt", serif;
    font-size: 16px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 32px;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
