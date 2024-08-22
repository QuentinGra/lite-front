import { defineStore } from 'pinia'
import type { userInterface } from '@/interfaces/user.interface'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as userInterface | null
  }),
  actions: {
    setUser(user: userInterface) {
      this.user = user
    }
  }
})
