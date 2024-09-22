export interface userInterface {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  roles: string[]
}

export interface userWithTimestampsInterface extends userInterface {
  createdAt: Date
  updatedAt: Date
}
