import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from 'src/common/get-user.decorator';
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createPostDto: CreatePostDto, @GetUser('id') userId: number) {
        return this.postsService.create(createPostDto, userId);
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParsePositiveIntPipe) id: number) {
        return this.postsService.findOne(id);
    }

    @Get('author/:authorId')
    findByAuthor(@Param('authorId', ParsePositiveIntPipe) authorId: number) {
        return this.postsService.findByAuthor(authorId);
    }
}
