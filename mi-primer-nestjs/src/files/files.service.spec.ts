import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { FilesService } from "./files.service";
import * as fs from 'fs';
import * as path from 'path';

// Mock del modulo fs
jest.mock('fs');
jest.mock('path');

describe('FilesService', () => {
    let service: FilesService;
    const mockFs = fs as jest.Mocked<typeof fs>;
    const mockPath = path as jest.Mocked<typeof path>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FilesService],
        }).compile();

        service = module.get<FilesService>(FilesService);

        // Reset mpocks antes de cada prueba
        jest.clearAllMocks();

        // Setup de mocks por defecto
        mockFs.existsSync.mockReturnValue(true);
        mockPath.extname.mockReturnValue('.jpg');
        mockPath.join.mockReturnValue('/mock/path');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('saveFile', () => {
        const mockFile: Express.Multer.File = {
            fieldname: 'file',
            originalname: 'test.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            size: 1024,
            buffer: Buffer.from('test file content'),
            destination: '',
            filename: '',
            path: '',
            stream: null,
        };

        it('should save file successfully', () => {
            const result = service.saveFile(mockFile, 'avatars');

            expect(mockPath.extname).toHaveBeenCalledWith('test.jpg');
            expect(mockFs.writeFileSync).toHaveBeenCalled();
            expect(result).toContain('avatars/');
        });

        it('should throw error for invalid file extension', () => {
            mockPath.extname.mockReturnValue('.txt');

            expect(() => service.saveFile(mockFile, 'avatars'))
                .toThrow(BadRequestException);
        });
    });
});