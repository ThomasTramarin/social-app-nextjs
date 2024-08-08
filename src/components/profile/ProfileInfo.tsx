"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { profileLinks, Item } from "@/lib/constants/profileLinks";
import { UserProfileData } from "@/lib/types/types";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
export default function ProfileInfo(userData: UserProfileData) {
  const pathname = usePathname();

  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      <div className="flex items-center justify-between gap-5 w-full md:px-10">
        <div className="flex items-center gap-5">
        {userData.data.avatar ? (
            <Image
              src={userData.data.avatar}
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px] object-cover object-center"
              alt="User profile avatar"
            />
          ) : (
            <RxAvatar size={100} className="mb-5" />
          )}
          <div className="max-w-28 md:max-w-52 overflow-auto">
            <div className="font-semibold text-[20px] text-black dark:text-white">
              {userData.data.name}
            </div>
            <div className="font-semibold text-[16px] text-gray-1 dark:text-gray-2">
              @{userData.data.username}
            </div>
          </div>
        </div>
        <div className="">
          <Link
            href="/profile/edit"
            className="px-8 py-2 rounded-lg bg-blue dark:bg-cyan text-white dark:text-black"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="flex justify-between mt-10 px-8 w-full md:px-20 lg:px-40">
        <div className="text-center">
          <div className="font-medium text-black dark:text-white text-lg leading-4">
            7683
          </div>
          <div className="font-normal text-gray-1 dark:text-gray-2 text-sm">
            Follower
          </div>
        </div>
        <div className="w-[2px] bg-gray-1 dark:bg-gray-2"></div>
        <div className="text-center">
          <div className="font-medium text-black dark:text-white text-lg leading-4">
            350
          </div>
          <div className="font-normal text-gray-1 dark:text-gray-2 text-sm">
            Following
          </div>
        </div>
        <div className="w-[2px] bg-gray-1 dark:bg-gray-2"></div>
        <div className="text-center">
          <div className="font-medium text-black dark:text-white text-lg leading-4">
            {userData.data.posts.length}
          </div>
          <div className="font-normal text-gray-1 dark:text-gray-2 text-sm">
            Post
          </div>
        </div>
      </div>
      <div className="text-center text-[15px] mt-10 text-gray-1 dark:text-gray-2 w-full md:px-10">
        {userData.data.bio}
      </div>

      <ul className="flex justify-between w-full px-10 md:px-20 mb-2 mt-10">
        {profileLinks.map((item: Item, index: number) => {
          const isActive =
            item.href === "/profile"
              ? pathname === "/profile"
              : pathname.startsWith(item.href);
          return (
            <li key={index} className={`${isActive ? "text-blue dark:text-cyan" : "text-black dark:text-white"}`}>
              <Link href={item.href}>{item.icon}</Link>
            </li>
          );
        })}
      </ul>

      <div className="h-[2px] w-full bg-gray-1 dark:bg-gray-2 mb-5"></div>
    </div>
  );
}
