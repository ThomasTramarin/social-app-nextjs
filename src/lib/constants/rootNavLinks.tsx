import { ReactNode } from "react";
import { LuUser2 } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { LuPlusCircle } from "react-icons/lu";
import { BiMessageAltMinus } from "react-icons/bi";

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export const rootNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: <BiHomeAlt size={28} /> },
  { label: "Search", href: "/search", icon: <FiSearch size={28} /> },
  { label: "Create Post", href: "/create-post", icon: <LuPlusCircle size={28} /> },
  { label: "Inbox", href: "/inbox", icon: <BiMessageAltMinus size={28} /> },
  { label: "Profile", href: "/profile", icon: <LuUser2 size={28} /> },
];