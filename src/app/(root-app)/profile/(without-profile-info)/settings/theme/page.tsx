import Link from "next/link";
import ThemeSwitcher from "@/components/profile/ThemeSwitcher";
import { FaArrowLeft } from "react-icons/fa6";

export default function ProfileSettingsThemePage() {
  return (
    <div>
      <Link href="/profile/settings">
        <FaArrowLeft size={24} className="mb-2" />
      </Link>
      <h1>Theme</h1>
      <ThemeSwitcher></ThemeSwitcher>
      <p className="text-xs text:gray-1 dark:text-gray-2 mt-2">
        Change the appearance of the application by saving your preferences in
        the browser
      </p>
    </div>
  );
}
