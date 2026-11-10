import { create } from "zustand";

type Tone = "light" | "dark";

interface WebChromeState {
  /** "light" = white status bar content. */
  statusBar: Tone;
  indicator: Tone;
  setChrome: (chrome: { statusBar: Tone; indicator: Tone }) => void;
}

/** Colors of the drawn iOS status bar / home indicator in the web preview (set by the focused screen). */
export const useWebChromeStore = create<WebChromeState>()((set) => ({
  statusBar: "light",
  indicator: "light",
  setChrome: (chrome) => set(chrome),
}));
