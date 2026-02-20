import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import GenderSelector from './controls/GenderSelector'
import NumberOfNames from './controls/NumberOfNames'
import { getGeneratedNames } from './atoms/names'
import { countAtom, genderAtom } from './atoms/controls'
import { FullName } from './types'


export default function NameGenerator () {
  const count = useAtomValue(countAtom)
  const gender = useAtomValue(genderAtom)
  const [generatedNames, setGeneratedNames] = useState<FullName[]>([])

  // useEffect(() => {
  //   const newNames = getGeneratedNames(count, gender)
  //   setGeneratedNames(newNames)
  // }, [count, gender])

  function handleSubmit (event: React.SyntheticEvent) {
    event.preventDefault()

    const newNames = getGeneratedNames(count, gender)
    setGeneratedNames(newNames)
  }

  return (
    <>
      <form id="name-generator" onSubmit={ event => handleSubmit(event)}>
        <NumberOfNames />
        <GenderSelector/>
        <button type='submit'>generate</button>
      </form>
      <hr/>
      <ul>
        { generatedNames.map((name, index) => (
          <li key={ index }>{ name.toString() }</li>
        ))}
      </ul>
    </>

  )
}
