import React from 'react'

export default () => (
  <div>
    <label htmlFor='number-of-names'>number of names to generate: </label>
    <input id='number-of-names' type='number' defaultValue={ 10 } min={ 0 } />
  </div>
)
