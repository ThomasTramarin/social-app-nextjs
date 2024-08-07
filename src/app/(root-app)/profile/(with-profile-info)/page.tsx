import UserPosts from "@/components/post/UserPosts";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function ProfilePostPage() {
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/get-user-profile-info", {
    next: {
      tags: ["user-profile-info"],
    },
    headers: {
      "Content-Type": "application/json",
      Session: JSON.stringify(session),
    },
  });
  const userData = await res.json();
  
  return <UserPosts data={userData}/>
}
