import React from 'react'
import styled from 'styled-components'
import { Link, Route } from 'wouter'

import NameGenerator from './NameGenerator'

import { NavContainer } from './NavContainer'
import Names from './Names'
import PrefixActiveLink from './PrefixActiveLink'

const Container = styled.div`
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

// TODO: custom wouter parser to get link "active" status correct?
export default function App () {
  return (
    <Container>
      <Header>
        <h1>skwist</h1>
        <h2><i>salish for name</i></h2>
      </Header>
      <NavContainer>
        <Link to="/" className={active => active ? 'active' : '' }>Generator</Link>
        <PrefixActiveLink to="/names" className={active => active ? 'active' : '' }>Names</PrefixActiveLink>
      </NavContainer>
      <Route path="/names/*?" component={ Names } />
      <Route path="/" component={ NameGenerator }/>
      <Footer>
        <div>source <a href='https://github.com/worc/skwist'>https://github.com/worc/skwist</a></div>
        <div>
          scraped from <a href='http://random-name-generator.info/'>http://random-name-generator.info/</a>
          <sup><a title="Wayback archive" href="https://web.archive.org/web/20190410151801/http://random-name-generator.info/">[1]</a></sup>
        </div>
      </Footer>
    </Container>
  )
}
