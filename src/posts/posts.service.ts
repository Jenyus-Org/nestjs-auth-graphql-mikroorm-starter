import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, ObjectLiteral, Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";

interface FindAllArgs {
  relations?: string[];
  authorId?: number;
}

interface FindOneArgs extends FindAllArgs {
  id: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(authorId: number, createPostInput: CreatePostDto | CreatePostInput) {
    return this.postsRepository.save({
      author: {
        id: authorId,
      },
      ...createPostInput,
    });
  }

  findAll(args?: FindAllArgs) {
    const { relations, authorId } = args;
    let where: ObjectLiteral | FindConditions<Post> = {};
    if (authorId) {
      where = { ...where, author: { id: authorId } };
    }
    return this.postsRepository.find({ relations, where });
  }

  findOne({ id, relations }: FindOneArgs) {
    return this.postsRepository.findOne(id, { relations });
  }

  update(id: number, updatePostInput: UpdatePostDto) {
    return this.postsRepository.save({ id, ...updatePostInput });
  }

  async remove(id: number) {
    const res = await this.postsRepository.delete(id);
    return res.affected === 1;
  }
}
