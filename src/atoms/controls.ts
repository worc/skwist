import { atom, useAtom } from 'jotai'
import { Gender } from '../types'

export const genderAtom = atom<Gender>('both')
export const countAtom = atom<number>(10)

export function useCountAtomForInput (): [string, (count: string) => void] {
  const [count, setCount] = useAtom(countAtom)

  const stringCount = count.toString()
  function setCountFromString (count: string) {
    setCount(parseInt(count, 10))
  }

  return [stringCount, setCountFromString]
}
