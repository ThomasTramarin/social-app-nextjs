import { authOptions } from "@/lib/authOptions";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { getServerSession } from "next-auth";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

export default async function ProfileEditPage() {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/get-user-profile-info", {
    headers: {
      "Content-Type": "application/json",
      Session: JSON.stringify(session),
    },
  });
  const userData = await res.json();

  return (
    <div>
      <Link href="/profile"><FaArrowLeft size={24} className="mb-2"/></Link>
      <h1 className="mb-8">Edit Profile</h1>
      <EditProfileForm data={userData}/>
    </div>
  );
}
