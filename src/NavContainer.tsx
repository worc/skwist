import styled from 'styled-components'

export const NavContainer = styled.nav`
  display: flex;
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;

  &.alpha {
    justify-content: space-between;
  }

  & a {
    text-decoration: none;
    padding: 4px;
  }

  & .active {
    color: white;
    background-color: gray;
    text-decoration: none;
  }
`
