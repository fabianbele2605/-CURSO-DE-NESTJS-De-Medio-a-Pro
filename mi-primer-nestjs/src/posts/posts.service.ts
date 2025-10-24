import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}
    
    async create(createPostDto: CreatePostDto, authorId: number) {
        const post = this.postRepository.create({
            ...createPostDto,
            authorId
        });
        return this.postRepository.save(post);
    }

    findAll() {
        return this.postRepository.find({
            relations: ['author'],
        });
    }

    findOne(id: number) {
        return this.postRepository.findOne({
            where: { id },
            relations: ['author']
        })
    }

    async findByAuthor(authorId: number) {
        return this.postRepository.find({
            where: { authorId },
            relations: ['author']
        })
    }
}
