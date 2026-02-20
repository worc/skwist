import React from 'react'

import { useCountAtomForInput } from '../atoms/controls'

export default function NumberOfNames () {
  const [count, setCount] = useCountAtomForInput()

  return (
    <div>
      <label htmlFor="number-of-names">number of names to generate: </label>
      <input
        id="number-of-names"
        type="number"
        value={ count }
        onChange={event => setCount(event.target.value)}
        min={1}
        step={1}
      />
    </div>
  )
}
