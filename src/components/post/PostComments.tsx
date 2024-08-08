"use client";

import { Comment } from "@/lib/types/types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dispatch, SetStateAction, useRef } from "react";
import { IoClose } from "react-icons/io5";
import createCommentAction from "@/lib/actions/createCommentAction";
import Image from "next/image";
import { dateFormat } from "@/lib/functions/dateFormat";
import { MdDelete } from "react-icons/md";

type Props = {
  openComments: boolean;
  comments: Comment[];
  setOpenComments: Dispatch<SetStateAction<boolean>>;
  postId: string | undefined;
};

export default function PostComments({
  openComments,
  comments,
  setOpenComments,
  postId,
}: Props) {
  const commentTextRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={`${
        openComments
          ? "block p-2 mt-5 w-full h-full top-[100%] left-0 border-t-2  border-black bg-white dark:bg-gray-1"
          : "hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Comments</div>
        <button onClick={() => setOpenComments(false)}>
          <IoClose size={24} className="text-black dark:text-white" />
        </button>
      </div>

      <form
        className="mb-6"
        
        action={async () => {
          const commentText = commentTextRef.current?.value;
          if (commentText !== undefined && postId !== undefined) {
            await createCommentAction({
              text: commentText,
              postId: postId,
            });

            if (commentTextRef.current) {
              commentTextRef.current.value = ""; // Clear the textarea
            }
          }
        }}
      >
        <div className="mt-3 mb-2">
          <Label htmlFor="comment">Write a comment</Label>
          <Textarea
            ref={commentTextRef}
            className="mt-1 resize-none"
            maxLength={200}
            rows={4}
            id="comment"
            name="comment"
          />
        </div>
        <Button type="submit">Create comment</Button>
      </form>

      {/* Comments Container */}
      <div className="flex flex-col gap-3">
        {comments.map((comment: Comment) => (
          <div
            key={comment.comment_id}
            className="flex items-start gap-2 p-2"
          >
            <Image
              src={comment.author_avatar}
              width={32}
              height={32}
              alt="Profile Avatar"
              className="rounded-full h-8 w-8 object-cover object-center flex-shrink-0"
            />
            <div className="flex flex-col w-full">
              <div className="text-gray-1 dark:text-gray-2 font-semibold text-sm leading-3">
                {comment.author_name}
              </div>
              <p className="leading-5">{comment.text}</p>
              <div className="flex items-center justify-between">
                <div className="text-gray-1 dark:text-gray-2 text-sm mt-1">
                  {dateFormat(comment.creation_date)}
                </div>
              {/*TODO: Delete button */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
