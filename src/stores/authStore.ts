import { defineStore } from 'pinia'
import type { User } from '@/interfaces/auth/user.interface'

export const useAuthStore = defineStore('auth', {
  state: (): { user: User | null } => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    }
  },
  getters: {
    isUserDefined: (state: { user: User | null }) => state.user !== null
  }
})
