export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  roles: string[]
}

export interface UserWithTimestampsInterface extends User {
  createdAt: Date
  updatedAt: Date
}
