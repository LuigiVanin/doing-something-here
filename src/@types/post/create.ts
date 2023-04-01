import { CreatePostInput } from "./../../dto/post/create.dto";

export type CreatePost = CreatePostInput & { userId: string };
