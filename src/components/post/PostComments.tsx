import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  openComments: boolean;
};

export default function PostComments({ openComments }: Props) {
  return (
    <div
      className={`${
        openComments
          ? "block p-2 mt-5 w-full h-full top-[100%] left-0 border-t-2 border-black bg-white dark:bg-gray-1"
          : "hidden"
      }`}
    >
      <div className="text-lg font-semibold">Comments</div>

<div>
      <Label>Write a comment</Label>
      <Input />
</div>
    </div>
  );
}
