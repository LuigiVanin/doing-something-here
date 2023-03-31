import { Post } from "@prisma/client";
import { CreatePostInput } from "./../../dto/post/create.dto";
import { PickOptional, SmartOmit } from "./../utils/transform";

export type CreatePost = CreatePostInput & { userId: string };
