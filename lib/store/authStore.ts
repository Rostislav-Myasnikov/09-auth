import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserAuth {
  email?: string;
  username: string;
  avatar?: string;
}


type AuthStore = {
    userInfo: UserAuth | null;
    isAuthenticated: boolean;

    setUser: (user:UserAuth ) => void; 
    clearIsAuthenticated: () => void;
}


export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            userInfo: null,
            isAuthenticated: false,
            setUser: (user: UserAuth) => set(()=> ({userInfo: user, isAuthenticated: true})),
            clearIsAuthenticated: () => set(() => ({userInfo:null, isAuthenticated: false}))
        }),
        {name: 'user-draft'}
));