import { CreatePostInput } from "./../../dto/post/create.dto";
import { PickOptional, SmartOmit } from "./../utils/transform";
import { Post } from "@prisma/client";

export type CreatePost = CreatePostInput & { userId: string };
