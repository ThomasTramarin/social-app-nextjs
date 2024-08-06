import { Item, settingsLnks } from "@/lib/constants/settingsLinks";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function ProfileSettingsPage() {
  return (
    <div>
      <Link href="/profile">
        <FaArrowLeft size={24} className="mb-2" />
      </Link>
      <h1 className="mb-8">Profile Settings</h1>
      <ul>
        {settingsLnks.map((item: Item, index: number) => (
          <li key={index}>
            <Link href={item.href} className="flex items-center gap-3 text-black dark:text-white font-medium hover:bg-blue hover:text-white dark:hover:bg-cyan dark:hover:text-black p-2 rounded-md transition-colors duration-200">{item.icon} {item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
