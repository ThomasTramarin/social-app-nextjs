"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { rootNavItems, NavItem } from "@/lib/constants/rootNavLinks"

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <section className="bottombar shadow-top-light dark:shadow-top-dark">
      <nav className="flex items-center justify-center h-full">
        <ul className="flex justify-between w-full items-center">
          {rootNavItems.map((item: NavItem, index: number) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={index} className={`${isActive ? "text-blue dark:text-cyan" : "text-black dark:text-white"}`}>
                <Link href={item.href}>
                  {item.icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}