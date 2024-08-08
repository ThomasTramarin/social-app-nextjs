"use client";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import deletePostAction from "@/lib/actions/deletePostAction";
import { useState, useOptimistic, startTransition, useTransition } from "react";
import postlikeAction from "@/lib/actions/postLikeAction";
import { Comment } from "@/lib/types/userTypes";
import PostComments from "./PostComments";

type PostProps = {
  avatarSrc: string;
  authorName: string;
  authorUsername: string;
  text: string;
  date: string;
  likes: number;
  reposts: number;
  image_url: string;
  isOwner?: boolean;
  postId?: string;
  userHasLiked: boolean;
  comments: Comment[];
  preview?: boolean;
};

export default function PostComponent({
  preview,
  avatarSrc,
  authorName,
  authorUsername,
  text,
  date,
  likes,
  comments,
  reposts,
  image_url,
  isOwner,
  postId,
  userHasLiked,
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

    if (dateString === "now") {
      return "now";
    }
    if (seconds < 60) {
      return "now";
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return "yesterday";
    } else if (days <= 7) {
      return `${days}d ago`;
    } else {
      return localDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  }

  const { text: cleanText, hashtags } = extractHashtags(text);
  const cleanDate = dateFormat(date);

  const [deleteState, setDeleteState] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const [hasLiked, setHasLiked] = useState(userHasLiked);
  const [openComments, setOpenComments] = useState(false);


  const [optimisticLikeCount, setOptimisticLikeCount] = useOptimistic(
    likes,
    (prevCount) => {
      return hasLiked ? prevCount - 1 : prevCount + 1;
    }
  );

  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    startTransition(() => {
      setHasLiked(!hasLiked);
      setOptimisticLikeCount((prevCount: number) =>
        hasLiked ? prevCount - 1 : prevCount + 1
      );
    });

    try {
      await postlikeAction(postId, !userHasLiked);
    } catch (error) {
      console.error("Errore nel like del post:", error);
    }
  };

  return (
    <article className={`p-2 bg-white dark:bg-gray-1 ${!openComments ? "rounded-xl" : "rounded-t-xl"}`}>
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

      <div className="text-[14px] text-gray-1 dark:text-gray-2 mx-10">
        {cleanText}
      </div>

      {image_url && (
        <div className="mx-10 my-4">
          <div className="relative w-full max-w-md mx-auto mt-2 aspect-w-16 aspect-h-9">
            <Image
              src={image_url}
              alt="Post Image"
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
            <Link
              href={`/search/hashtags/${hashtag.replace("#", "")}`}
              key={index}
            >
              {hashtag}{" "}
            </Link>
          ))}
        </div>
      )}

      <div className="ml-10 mt-4 flex justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col items-center">
            <button
              onClick={handleLike}
              aria-label="Like this post"
              disabled={preview ? true : isPending}
            >
              <FiHeart
                size={24}
                className={`${
                  hasLiked
                    ? "text-blue dark:text-cyan"
                    : "text-black dark:text-white"
                }`}
              />
            </button>
            <span className="text-black dark:text-white text-xs">
              {optimisticLikeCount}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button disabled={preview} onClick={() => setOpenComments(true)}>
              <BiMessageDetail
                size={24}
                className="text-black dark:text-white"
              />
            </button>
            <span className="text-black dark:text-white text-xs">
              {comments.length}
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
        {isOwner && (
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"link"} aria-label="Post info">
                  <HiDotsHorizontal
                    size={24}
                    className="text-black dark:text-white"
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-sm:max-w-[300px] rounded-xl">
                <DialogHeader>
                  <DialogTitle>Post info</DialogTitle>
                </DialogHeader>
                <Button onClick={() => deletePostAction(postId)}>
                  Delete Post
                </Button>
                {deleteState && (
                  <p
                    aria-live="polite"
                    className={`${
                      deleteState.successMessage
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {deleteState.successMessage
                      ? deleteState.successMessage
                      : deleteState.errorMessage}
                  </p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <PostComments openComments={openComments}/>
    </article>
  );
}
