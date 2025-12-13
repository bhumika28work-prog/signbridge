import { create } from 'zustand';

interface User {
    username: string;
    email?: string;
    role?: 'student' | 'teacher' | 'parent' | null;
}

interface Store {
    user: User | null;
    setUser: (user: User) => void;
    setRole: (role: 'student' | 'teacher' | 'parent') => void;
    clearRole: () => void;
    logout: () => void;
}

export const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    setRole: (role) => set((state) => ({
        user: state.user ? { ...state.user, role } : null
    })),
    clearRole: () => set((state) => ({
        user: state.user ? { ...state.user, role: null } : null
    })),
    logout: () => set({ user: null }),
}));
