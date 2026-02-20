import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NumberOfNames from './number_of_names'
import GenderSelector from './gender_selector'
import femaleNames from '../names/female_names.json'
import maleNames from '../names/male_names.json'
import surnames from '../names/surnames.json'
import shuffledDeckGenerator from './shuffled_deck_generator'

export default () => {
  const [femaleNameDeck, setFemaleNameDeck] = useState(null)
  const [maleNameDeck, setMaleNameDeck] = useState(null)
  const [surnameDeck, setSurnameDeck] = useState(null)
  const [generatedNames, setGeneratedNames] = useState([])

  useEffect(() => {
    axios.get(femaleNames).then(response => {
      console.log('female names received', response.data.length)
      setFemaleNameDeck(shuffledDeckGenerator(response.data))
    })

    axios.get(maleNames).then(response => {
      console.log('male names received', response.data.length)
      setMaleNameDeck(shuffledDeckGenerator(response.data))
    })

    axios.get(surnames).then(response => {
      console.log('surnames received', response.data.length)
      setSurnameDeck(shuffledDeckGenerator(response.data))
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault(true)
    const numberOfNames = parseInt(event.target['number-of-names'].value, 10)
    const gender = event.target['gender-selector'].value
    if (gender === 'both men and women') {
      setGeneratedNames([ ...Array(numberOfNames) ].map(() => {
        return Math.random() > 0.50
          ? `${maleNameDeck.next().value} ${surnameDeck.next().value}`
          : `${femaleNameDeck.next().value} ${surnameDeck.next().value}`
      }))
    } else if (gender === 'men') {
      setGeneratedNames([ ...Array(numberOfNames) ].map(() => `${maleNameDeck.next().value} ${surnameDeck.next().value}`))
    } else if (gender === 'women') {
      setGeneratedNames([ ...Array(numberOfNames) ].map(() => `${femaleNameDeck.next().value} ${surnameDeck.next().value}`))
    } else {
      throw new Error('hm... nope...')
    }
  }

  return (
    <form id='name-generator' onSubmit={ e => handleSubmit(e) }>
      <NumberOfNames/>
      <GenderSelector/>
      <button type='submit'>generate</button>
      <hr/>
      <ul>
        { generatedNames.map(name => <li key={ name }>{name}</li>)}
      </ul>
    </form>
  )
}
