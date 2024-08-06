import CreatePostForm from "@/components/post/CreatePostForm";
import PostComponent from "@/components/post/PostComponent";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function CreatePostPage() {
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
      <h1 className="mb-8">Create Post</h1>
      <CreatePostForm data={userData}/>
    </div>
  );
}
