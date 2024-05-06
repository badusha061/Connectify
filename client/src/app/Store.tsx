import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {Store} from '../types/database'


const useUserStore = create<Store>()(
    devtools(
      persist(
        (set) => ({
            user: null,
            addUser: (user) => set({user}),
            removeUser: () => set({user : null})
        }),
        {
            name:'userStore'
        }
      ),
    ),
  )

export default useUserStore