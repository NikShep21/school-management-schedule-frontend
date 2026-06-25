import { create } from "zustand";

interface SnackbarItem {
  id: string;
  message: string;
}

interface SnackbarStore {
  snackbars: SnackbarItem[];
  showSnackbar: (message: string) => void;
  closeSnackbar: (id: string) => void;
}

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  snackbars: [],

  showSnackbar: (message) => {
    set((state) => ({
      snackbars: [
        ...state.snackbars,
        {
          id: crypto.randomUUID(),
          message,
        },
      ],
    }));
  },

  closeSnackbar: (id) => {
    set((state) => ({
      snackbars: state.snackbars.filter((snackbar) => snackbar.id !== id),
    }));
  },
}));
