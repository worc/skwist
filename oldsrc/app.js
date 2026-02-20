import React from 'react'
import styled from 'styled-components'
import { Route, NavLink } from 'react-router-dom'
import NameGenerator from './generator/_name_generator'
import Names from './names/_names'
import { NavContainer } from './names/_names'

const Container = styled.div`
  font-family: "Rokkitt", serif;
`

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 8px;
`

const Footer = styled.footer`
  border-top: 2px solid gray;
  font-size: 12px;
  padding: 4px;
  text-align: center;

  & > * {
    margin: 8px;
  }
`

export default () => {
  return (
    <Container>
      <Header>
        <h1>skwist</h1>
        <h2><i>salish for name</i></h2>
      </Header>
      <NavContainer>
        <NavLink exact to='/'>Generator</NavLink>
        <NavLink to='/names' isActive={ (match, location) => location.pathname.startsWith('/names')}>Names</NavLink>
      </NavContainer>
      <Route exact path='/' component={ NameGenerator }/>
      <Route path='/names' component={ Names }/>
      <Footer>
        <div>source <a href='https://github.com/worc/skwist'>https://github.com/worc/skwist</a></div>
        <div>scraped from <a href='http://random-name-generator.info/'>http://random-name-generator.info/</a></div>
      </Footer>
    </Container>
  )
}
