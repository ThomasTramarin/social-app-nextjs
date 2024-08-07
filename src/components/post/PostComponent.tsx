import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { RxAccessibility, RxAvatar } from "react-icons/rx";
import Link from "next/link";

type PostProps = {
  avatarSrc: string;
  authorName: string;
  authorUsername: string;
  text: string;
  date: string;
  likes: number;
  comments: number;
  reposts: number;
  image_url: string;
};

export default function PostComponent({
  avatarSrc,
  authorName,
  authorUsername,
  text,
  date,
  likes,
  comments,
  reposts,
  image_url,
}: PostProps) {
  function extractHashtags(input: string): {
    text: string;
    hashtags: string[];
  } {
    const hashtagRegex = /#\w+/g;
    const hashtags = input.match(hashtagRegex) || [];
    const text = input.replace(hashtagRegex, "").trim();

    return {
      text,
      hashtags,
    };
  }

  function dateFormat(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const userTimezoneOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDate = new Date(date.getTime() - userTimezoneOffset);
    const diff = now.getTime() - localDate.getTime();
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if(dateString === "now"){
      return 'now';
    }
    if (seconds < 60) {
      return 'now';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'yesterday';
    } else if (days <= 7) {
      return `${days}d ago`;
    } else {
      return localDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  }

  const { text: cleanText, hashtags } = extractHashtags(text);
  const cleanDate = dateFormat(date);

  return (
    <article className="p-2 bg-white dark:bg-gray-1 rounded-xl">
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-2 items-center">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              width={32}
              height={32}
              alt="Profile Avatar"
              className="rounded-full h-8 w-8 object-cover object-center"
            />
          ) : (
            <RxAvatar size={32} className="text-black dark:text-white" />
          )}

          <div className="font-semibold text-[18px] text-black dark:text-white">
            <Link href={`/search/users/${authorUsername}`}>{authorName}</Link>
          </div>
        </div>
        <div className="text-black dark:text-white text-xs">{cleanDate}</div>
      </div>

      <div className="text-[13px] text-gray-1 dark:text-gray-2 mx-10">
        {cleanText}
      </div>

      {image_url && (
        <div className="mx-10 my-4">
          <div className="relative w-full max-w-md mx-auto mt-2 aspect-w-16 aspect-h-9">
            <Image
              src={image_url}
              alt="Post Image"
              layout="responsive"
              width={700}
              height={475}
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {hashtags.length > 0 && (
        <div className="text-[13px] ml-10 text-blue dark:text-cyan font-medium">
          {hashtags.map((hashtag, index) => (
            <span key={index}>{hashtag} </span>
          ))}
        </div>
      )}

      <div className="ml-10 mt-4 flex justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col items-center">
            <FiHeart size={24} className="text-black dark:text-white" />
            <span className="text-black dark:text-white text-xs">{likes}</span>
          </div>
          <div className="flex flex-col items-center">
            <BiMessageDetail size={24} className="text-black dark:text-white" />
            <span className="text-black dark:text-white text-xs">
              {comments}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <HiMiniArrowPathRoundedSquare
              size={24}
              className="text-black dark:text-white"
            />
            <span className="text-black dark:text-white text-xs">
              {reposts}
            </span>
          </div>
        </div>
        <div>
          <HiDotsHorizontal size={24} className="text-black dark:text-white" />
        </div>
      </div>
    </article>
  );
}
