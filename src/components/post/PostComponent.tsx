import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

type PostProps = {
  avatarSrc: string;
  authorName: string;
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
  text,
  date,
  likes,
  comments,
  reposts,
  image_url,
}: PostProps) {

  function extractHashtags(input: string): { text: string, hashtags: string[] } {
    const hashtagRegex = /#\w+/g;
    const hashtags = input.match(hashtagRegex) || [];
    const text = input.replace(hashtagRegex, "").trim();

    return {
      text,
      hashtags,
    };
  }

  const { text: cleanText, hashtags } = extractHashtags(text);



  return (
    <article className="p-2 bg-white dark:bg-gray-1 rounded-xl">
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-2 items-center">
          <Image
            src={avatarSrc}
            width={32}
            height={32}
            alt="Profile Avatar"
            className="rounded-full h-8 w-8 object-cover object-center"
          />
          <div className="font-semibold text-[18px] text-black dark:text-white">
            {authorName}
          </div>
        </div>
        <div className="text-black dark:text-white text-xs">{date}</div>
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
