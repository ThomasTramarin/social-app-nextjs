"use client";

import { rootNavItems, NavItem } from "@/lib/constants/rootNavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <div className="font-bold text-2xl text-center mb-6 text-black dark:text-white">Social App</div>
      <nav>
        <ul className="flex flex-col gap-3">
          {rootNavItems.map((item: NavItem, index: number) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li
                key={index}
                className={`${
                  isActive
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white"
                }`}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-colors duration-200 ${
                    isActive ? "bg-blue dark:bg-cyan" :
                    "hover:bg-blue/20 dark:hover:bg-cyan/20"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
