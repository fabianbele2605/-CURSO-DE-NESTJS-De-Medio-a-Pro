import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

describe('FilesController', () => {
    let controller: FilesController;
    let filesService: FilesService;

    const mockFilesService = {
        saveFile: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FilesController],
            providers: [
                {
                    provide: FilesService,
                    useValue: mockFilesService
                }
            ]
        }).compile();

        controller = module.get<FilesController>(FilesController);
        filesService = module.get<FilesService>(FilesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('uploadAvatar', () => {
        const mockFile: Express.Multer.File = {
            fieldname: 'file',
            originalname: 'avatar.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            size: 1024,
            buffer: Buffer.from('avatar file content'),
            destination: '',
            filename: '',
            path: '',
            stream: null,
        };

        it('should upload avatar successfully', () => {
            mockFilesService.saveFile.mockReturnValue('avatars/test.jpg');

            const result = controller.uploadAvatar(mockFile);

            expect(filesService.saveFile).toHaveBeenLastCalledWith(mockFile, 'avatars');
            expect(result).toEqual({
                message: 'Avatar uploaded successfully',
                filePath: 'avatars/test.jpg'
            });
        });
    });

    describe('uploadPostImage', () => {
        const mockFile: Express.Multer.File = {
            fieldname: 'file',
            originalname: 'post.png',
            encoding: '7bit',
            mimetype: 'image/png',
            size: 1024,
            buffer: Buffer.from('post image file content'),
            destination: '',
            filename: '',
            path: '',
            stream: null,
        };

        it('should upload post image successfully', () => {
            mockFilesService.saveFile.mockReturnValue('posts/test.png');

            const result = controller.uploadPostImage(mockFile);

            expect(filesService.saveFile).toHaveBeenLastCalledWith(mockFile, 'posts');
            expect(result).toEqual({
                message: 'Post image uploaded successfully',
                filePath: 'posts/test.png'
            });
        });
    });
});