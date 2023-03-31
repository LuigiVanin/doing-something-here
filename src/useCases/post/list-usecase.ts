import { Ok, Result } from "@sniptt/monads";
import type { ListPostInput } from "../../dto/post/list.dto";
import type { FindPostQuery, FindPostResult, LisPostUseCaseInput } from "~~/src/@types/post/list";
import type { UseCase } from "~~/src/@types/usecase";
import { PostRepository } from "~~/src/repositories/post-repositories";

export class ListPostUseCase implements UseCase<LisPostUseCaseInput, FindPostResult> {
    private postRespository: PostRepository;

    constructor() {
        this.postRespository = new PostRepository();
    }

    private createQuery({ parentId, userId, userTargetId }: LisPostUseCaseInput): FindPostQuery {
        // TODO: cerate a option where it can call all posts with a specific user id
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
        return { ...query, meId: userId };
    }

    async execute(input: LisPostUseCaseInput) {
        const query = this.createQuery(input);
        const postsOpt = await this.postRespository.find(query, {
            skip: (input.page - 1) * 10,
            take: 10,
        });
        return postsOpt.match<Result<FindPostResult, any>>({
            some: (posts) => Ok(posts),
            none: () => Ok([]),
        });
    }
}
