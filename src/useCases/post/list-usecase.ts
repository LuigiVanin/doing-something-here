import { Ok } from "@sniptt/monads";
import { UseCase } from "~~/src/@types/usecase";
import { PostRepository } from "~~/src/repositories/post-repositories";

interface ListPostInput {
    userId: string;
    userTargetId: string | null;
    parentId: string | null;
}

export class ListPostUseCase implements UseCase<any, any> {
    private postRespository: PostRepository;

    constructor() {
        this.postRespository = new PostRepository();
    }

    private createQuery({ parentId, userId, userTargetId }: ListPostInput) {
        const query: any = {};
        if (parentId) {
            query.parentId = parentId;
            query.published = true;
        } else if (!userTargetId || userTargetId === userId) {
            query.userId = userId;
        } else {
            query.userId = userTargetId;
            query.published = true;
        }
        return query;
    }

    async execute(input: {
        userId: string;
        userTargetId: string | null;
        parentId: string | null;
    }) {
        const query = this.createQuery(input);
        const posts = await this.postRespository.find(query);
        return Ok(posts);
    }
}
