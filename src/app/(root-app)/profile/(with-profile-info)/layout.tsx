import ProfileInfo from "@/components/profile/ProfileInfo";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/get-user-profile-info",{
    headers: {
      "Content-Type": "application/json",
      "Session": JSON.stringify(session)
    }
  });
  const userData = await res.json();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Profile</h1>
        <Link href="/profile/settings"><IoSettingsOutline size={24} className="text-black dark:text-white"/></Link>
      </div>
      <ProfileInfo data={userData}/>
      {children}
    </div>
  );
}
