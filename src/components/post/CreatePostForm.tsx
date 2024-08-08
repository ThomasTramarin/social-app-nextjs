"use client";

import { createPostAction } from "@/lib/actions/createPostAction";
import { createPostSchema } from "@/lib/validations/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PostComponent from "./PostComponent";
import { UserProfileData } from "@/lib/types/userTypes";

export default function CreatePostForm(userData: UserProfileData) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const [image, setImage] = useState<any>("");
  const [content, setContent] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [visibility, setVisibility] = useState("public");

  const form = useForm<z.output<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      allowComments: true,
      visibility: "public",
    },
  });

  useEffect(() => {
    if (formState.successMessage) {
      formRef.current?.reset();
    }
  }, [formState]);

  const onSubmit = async (data: z.infer<typeof createPostSchema>) => {
    const formData = new FormData();

    formData.append("content", data.content);
    formData.append("allowComments", allowComments.toString());
    formData.append("visibility", visibility);

    if (image?.secure_url) {
      formData.append("image", image.secure_url);
    }

    const res = await createPostAction(formData);
    setFormState(res);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={formRef}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Post Content..."
                      {...field}
                      onChange={(e) => {
                        setContent(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <CldUploadWidget
            uploadPreset="social-app-nextjs"
            onSuccess={(result) => setImage(result.info)}
          >
            {({ open }) => {
              return (
                <div>
                  <Label htmlFor="image" className="mb-2 block">
                    Image
                  </Label>
                  <Button
                    type="button"
                    id="image"
                    className="w-full"
                    onClick={() => open()}
                  >
                    Set Image
                  </Button>
                </div>
              );
            }}
          </CldUploadWidget>
          <FormField
            control={form.control}
            name="allowComments"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="mt-[2px] text-gray-1 dark:text-gray-2">
                    Allow Comments
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={allowComments}
                      onCheckedChange={(checked) => {
                        setAllowComments(checked);
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="mt-[2px] text-gray-1 dark:text-gray-2">
                    Visibility
                  </FormLabel>
                  <FormControl>
                    <Select
                      defaultValue="public"
                      onValueChange={(value) => setVisibility(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="followers">Followers</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Create Post</Button>
          {formState && (
            <p
              aria-live="polite"
              className={`${
                formState.successMessage ? "text-green-600" : "text-red-600"
              }`}
            >
              {formState.successMessage
                ? formState.successMessage
                : formState.errorMessage}
            </p>
          )}
        </form>
      </Form>
      <div className="mt-10">
        <PostComponent
          userHasLiked={false}
          avatarSrc={userData.data.avatar}
          authorName={userData.data.name}
          authorUsername={userData.data.username}
          text={content}
          date="now"
          likes={0}
          comments={[]}
          reposts={0}
          image_url={image?.secure_url}
          preview={true}
        />
      </div>
    </div>
  );
}
