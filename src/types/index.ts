export type Gender = 'both' | 'men' | 'women'

export interface FullName {
  givenName: string
  givenNameGender: Gender
  surname?: string
  toString: () => string
}
