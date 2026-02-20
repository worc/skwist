import React, { useEffect, useState } from 'react'
import { Link, Route } from 'wouter'
import styled from 'styled-components'

import { NavContainer } from './NavContainer'
import feminineNames from './json/feminineNames.json'
import masculineNames from './json/masculineNames.json'
import surnames from './json/surnames.json'
import PrefixActiveLink from './PrefixActiveLink'


const MarginLi = styled.li`
  margin: 0 16px;
`

function AlphaNav ({ rootPath }: { rootPath: string }) {
  const alphabet = [ ...'abcdefghijklmnopqrstuvwxyz' ]
  return (
    <NavContainer>
      { alphabet.map(letter => (
        <PrefixActiveLink to={`${rootPath}/${letter}`} key={letter} className={active => active ? 'active' : '' }>{ letter.toUpperCase() }</PrefixActiveLink>
      ))}
    </NavContainer>
  )
}

function startsWith (letter?: string): (name: string) => boolean {
  return function nameFilter (name: string) {
    if (letter) {
      return name.toLowerCase().startsWith(letter.toLowerCase())
    } else {
      return true
    }
  }
}

const mapGender = (gender: 'man' | 'woman') => (name: string): GivenName => ({ name, gender })

interface GivenName {
  name: string
  gender: 'man' | 'woman'
}

function GivenNames (params : { letter?: string }) {
  const [filteredNames, setFilteredNames] = useState<GivenName[]>([])

  useEffect(() => {
    setFilteredNames(() => {
      const filteredFeminineNames = feminineNames.filter(startsWith(params.letter)).map(mapGender('woman'))
      const filteredMasculineNames = masculineNames.filter(startsWith(params.letter)).map(mapGender('man'))

      return [ ...filteredFeminineNames, ...filteredMasculineNames]
        .sort((a, b) => a.name.localeCompare(b.name))
    })
  }, [params.letter])

  return (
    <div>
      <AlphaNav rootPath='/names/given'/>
      {/* TODO: The original intent appears to have been to include a gender filter here: */}
      {/* { match.params.secondScope } */}
      { filteredNames.map(name => <MarginLi key={ `${name.name}-${name.gender}` }>{ name.name }—{ name.gender }</MarginLi>) }
    </div>
  )
}

function Surnames ({ letter }: { letter?: string }) {
  const [filteredSurnames, setFilteredSurnames] = useState<string[]>([])

  useEffect(() => {
    setFilteredSurnames(surnames.filter(startsWith(letter)))
  }, [letter])

  return (
    <div>
      <AlphaNav rootPath="/names/surnames" />
      { filteredSurnames.map((name, index) => (
        <MarginLi key={ index }>{ name }</MarginLi>
      ))}
    </div>
  )
}

export default function Names () {
  return (
    <div>
      <NavContainer>
        <PrefixActiveLink to="/names/given" className={active => active ? 'active' : '' }>Given Names</PrefixActiveLink>
        <PrefixActiveLink to="/names/surnames" className={active => active ? 'active' : '' }>Surnames</PrefixActiveLink>
      </NavContainer>
      <Route path="/names/given/:letter?">
        { params => <GivenNames letter={ params.letter } /> }
      </Route>
      <Route path='/names/surnames/:letter?'>
        { params => <Surnames letter={ params.letter } /> }
      </Route>
    </div>
  )
}
