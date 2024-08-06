import { ReactNode } from "react";
import { IoMoon } from "react-icons/io5";

export interface Item {
  label: string;
  href: string;
  icon: ReactNode;
}

export const settingsLnks: Item[] = [
  { label: "Theme", href: "/profile/settings/theme", icon: <IoMoon size={24} /> },

];