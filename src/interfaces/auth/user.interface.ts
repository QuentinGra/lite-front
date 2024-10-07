export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  roles: string[]
}

export interface UserWithTimestampsInterface {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  createdAt: Date
  updatedAt: Date
  roles: string
}

export interface UserState {
  users: UserWithTimestampsInterface[]
}
