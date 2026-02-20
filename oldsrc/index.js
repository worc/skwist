import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './src/app.js'

const GlobalStyle = createGlobalStyle`
  html, body, h1, h2 {
    padding: 0;
    margin: 0;
  }

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 32px;
  }

  #app {
    font-size: 16px;
  }
`
render(
  <BrowserRouter>
    <GlobalStyle/>
    <App/>
  </BrowserRouter>
  , document.getElementById('app')
)
