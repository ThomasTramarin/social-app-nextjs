import { Post, UserProfileData } from "@/lib/types/userTypes";
import PostComponent from "./PostComponent";

export default function UserPosts(userData: UserProfileData) {
  return (
    <div className="flex flex-col gap-4">
      {userData.data.posts.map((item: Post) => (
        <PostComponent
          key={item.post_id}
          postId={item.post_id}
          avatarSrc={userData.data.avatar}
          authorName={userData.data.name}
          authorUsername={userData.data.username}
          text={item.text}
          date={item.creation_date}
          likes={item.likes}
          comments={item.comments}
          reposts={item.reposts}
          image_url={item.image_url}
          isOwner={true}
          userHasLiked={item.userHasLiked}
        />
      ))}
    </div>
  );
}
