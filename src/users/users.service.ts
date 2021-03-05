import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";

interface FindAllArgs {
  relations?: string[];
}

interface FindOneArgs extends FindAllArgs {
  id?: number;
  username?: string;
  postId?: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserInput: Partial<User>) {
    return this.usersRepository.save(createUserInput);
  }

  findAll(args?: FindAllArgs) {
    return this.usersRepository.find(args);
  }

  async findOne({ id, username, postId }: FindOneArgs) {
    if (id) {
      return await this.usersRepository.findOne(id);
    } else if (username) {
      return await this.usersRepository
        .createQueryBuilder()
        .where("LOWER(username) = LOWER(:username)", { username })
        .getOne();
    } else if (postId) {
      return await this.usersRepository.findOne({
        join: { alias: "users", innerJoin: { posts: "users.posts" } },
        where: (qb) => {
          qb.where("posts.id = :postId", { postId });
        },
      });
    } else {
      throw new Error("One of ID or username must be provided.");
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput | UpdateUserDto) {
    return this.usersRepository.save({ id, ...updateUserInput });
  }

  async remove(id: number) {
    const res = await this.usersRepository.delete(id);
    return res.affected === 1;
  }
}
