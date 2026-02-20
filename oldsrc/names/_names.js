import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Route, NavLink } from 'react-router-dom'
import surnamesJson from './surnames.json'
import femaleNamesJson from './female_names.json'
import maleNamesJson from './male_names.json'

const mapGender = (gender) => (name) => ({ name, gender })

const GivenNames = ({ match }) => {
  const [femaleNames, setFemaleNames] = useState([])
  const [maleNames, setMaleNames] = useState([])
  const [filteredNames, setFilteredNames] = useState([])

  useEffect(() => {
    axios.get(femaleNamesJson).then(response => setFemaleNames(response.data.map(mapGender('female'))))
    axios.get(maleNamesJson).then(response => setMaleNames(response.data.map(mapGender('male'))))
  }, [])

  useEffect(() => {
    const combinedNames = [ ...femaleNames, ...maleNames].sort((a, b) => a.name.localeCompare(b.name))
    setFilteredNames(combinedNames.filter(name => {
      if (match.params.scope && match.params.scope.length === 1) {
        return name.name.toLowerCase().startsWith(match.params.scope.toLowerCase())
      } else {
        return true
      }
    }))
  }, [match.params.scope, femaleNames, maleNames])

  return (
    <div>
      <AlphaNav rootPath='/names/given'/>
      { match.params.secondScope }
      { filteredNames.map(name => <MarginLi key={ `${name.name}-${name.gender}` }>{ name.name }—{ name.gender }</MarginLi>) }
    </div>
  )
}

const Surnames = ({ match }) => {
  const [surnames, setSurnames] = useState([])
  const [filteredSurnames, setFilteredSurnames] = useState([])

  useEffect(() => {
    axios.get(surnamesJson).then(response => setSurnames(response.data))
  }, [])

  useEffect(() => {
    setFilteredSurnames(surnames.filter(name => {
      if (match.params.scope && match.params.scope.length === 1) {
        return name.toLowerCase().startsWith(match.params.scope.toLowerCase())
      } else {
        return true
      }
    }))
  }, [match.params.scope, surnames])

  return (
    <div>
      <AlphaNav rootPath='/names/surnames'/>
      { filteredSurnames.map(name => <MarginLi key={ name }>{ name }</MarginLi>) }
    </div>
  )
}

const MarginLi = styled.li`
  margin: 0 16px;
`

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

const AlphaNav = ({ rootPath }) => {
  const alphabet = [ ...'abcdefghijklmnopqrstuvwxyz' ]
  return (
    <NavContainer className='alpha'>
      { alphabet.map(letter => (

        <NavLink to={ `${rootPath}/${letter}` } key={ letter }>{ letter.toUpperCase() }</NavLink>
      ))}
    </NavContainer>
  )
}

export default () => {
  return (
    <div>
      <NavContainer>
        <NavLink to='/names/given'>Given Names</NavLink>
        <NavLink to='/names/surnames'>Surnames</NavLink>
      </NavContainer>
      <Route path='/names/given/:scope?/:secondScope?' component={ GivenNames }/>
      <Route path='/names/surnames/:scope?/:secondScope?' component={ Surnames }/>
    </div>
  )
}
