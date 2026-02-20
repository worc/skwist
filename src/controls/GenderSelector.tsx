import React from 'react'
import { useAtom } from 'jotai'

import { Gender } from '../types'
import { genderAtom } from '../atoms/controls'

export default function GenderSelector () {
  const [gender, setGender] = useAtom(genderAtom)

  return (
    <div>
      <label htmlFor="gender-selector">names given to: </label>
      <select
        id="gender-selector"
        value={gender}
        onChange={event => setGender(event.target.value as Gender)}
      >
        <option value="both">both men and women</option>
        <option value="men">men</option>
        <option value="women">women</option>
      </select>
    </div>
  )
}
