import { FiHeart } from "react-icons/fi";
import { TbMessageDots } from "react-icons/tb";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { ReactNode } from "react";

export interface Item {
  href: string;
  icon: ReactNode;
}

export const profileLinks: Item[] = [
  { href: "/profile", icon: <TbMessageDots size={28} /> },
  { href: "/profile/like", icon: <FiHeart size={28} /> },
  { href: "/profile/repost", icon: <HiMiniArrowPathRoundedSquare size={28} /> },
];