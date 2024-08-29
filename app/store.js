import { create } from "zustand";

const useAuthStore = create((set) => ({
  data: { email: "", password: "", username: "" },
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),

  confirmPassword: "",
  setConfirmPassword: (value) => set({ confirmPassword: value }),

  showPassword: false,
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),

  showConfirmPassword: false,
  toggleShowConfirmPassword: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),

  rememberMe: false,
  toggleRememberMe: () => set((state) => ({ rememberMe: !state.rememberMe })),

  tnc: false,
  toggleTnc: () => set((state) => ({ tnc: !state.tnc })),

  error: {},
  setError: (error) => set({ error }),
}));

export default useAuthStore;
