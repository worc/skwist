import { FullName, Gender } from '../types'
import { shuffleDrainShuffle } from '../GetFromShuffled'
import feminineNames from '../json/feminineNames.json'
import masculineNames from '../json/masculineNames.json'
import surnames from '../json/surnames.json'

const feminineNameGenerator = shuffleDrainShuffle(feminineNames)
const masculineNameGenerator = shuffleDrainShuffle(masculineNames)
const surnameGenerator = shuffleDrainShuffle(surnames)

interface MapOptions {
  gender: Gender
  withSurname: boolean
}
function mapWithOptions (options: MapOptions): (name: unknown, index: number, array: FullName[]) => FullName {
  let activeGender = options.gender === 'both'
    // TODO: do we care to address the potential bias here? or is it close enough to 50-50 to not matter?
    ? (Math.random() > 0.50)
      ? 'men'
      : 'women'
    : options.gender

  let activeGenerator = activeGender === 'men' ? masculineNameGenerator : feminineNameGenerator

  if (options.gender === 'both') {
    activeGender = activeGender === 'men' ? 'women' : 'men'
  }

  return (_name, _index, _array) => {
    const givenName = activeGenerator.next().value
    const givenNameGender = activeGender
    const surname = options.withSurname ? surnameGenerator.next().value : undefined

    const fullName: FullName = {
      givenName,
      givenNameGender,
      surname,
      toString: () => `${givenName} ${surname}`
    }

    return fullName

  }
}

export function getGeneratedNames (count: number, gender: Gender, withSurname = true): FullName[] {
  const names = [ ...Array(count)]
  return names.map(mapWithOptions({ gender, withSurname }))
}

