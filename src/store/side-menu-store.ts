import { create } from "zustand";

interface SideMenuState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/** Burger menu visibility — the drawer is rendered above the tab bar by the tabs layout. */
export const useSideMenuStore = create<SideMenuState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
