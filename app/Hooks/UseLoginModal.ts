import { create } from "zustand";

interface LoginModalStore {
    isOpen: boolean;
    Open: () => void;
    close: () => void;
}

const UseLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    Open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
export default UseLoginModal;
