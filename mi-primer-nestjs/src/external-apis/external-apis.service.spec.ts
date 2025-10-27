import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApisService } from './external-apis.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';


describe('ExternalApisService', () => {
  let service: ExternalApisService;
  let httpService: HttpService;
  let cacheManager: any;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalApisService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<ExternalApisService>(ExternalApisService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data', async () => {
      const cachedWeather = {
        location: 'Madrid',
        temperature: 25,
        description: 'sunny',
        humidity: 60,
        windSpeed: 10,
      };

      mockCacheManager.get.mockResolvedValue(cachedWeather);

      const result = await service.getWeather('Madrid');

      expect(result).toEqual(cachedWeather);
      expect(mockCacheManager.get).toHaveBeenCalledWith('weather-madrid');
      expect(mockHttpService.get).not.toHaveBeenCalled();
    });

    it('should fetch and cache new data if not in cache', async () => {
      const weatherResponse = {
        data: {
          name: 'Madrid',
          main: { temp: 25, humidity: 60 },
          weather: [{ description: 'sunny' }],
          wind: { speed: 10 },
        },
      };

      mockCacheManager.get.mockResolvedValue(null);
      mockHttpService.get.mockReturnValue(of(weatherResponse));

      const result = await service.getWeather('Madrid');

      expect(result.location).toBe('Madrid');
      expect(result.temperature).toBe(25);
      expect(mockCacheManager.set).toHaveBeenCalledWith(
        'weather-madrid', 
        expect.any(Object), 
        600
      );
    });
  });

  describe('getRandomQuote', () => {
    it('should return cache quote if available', async () => {
      const cachedQuote = {
        text: 'Test quote',
        author: 'Test Author',
        category: 'wisdom',
      };

      mockCacheManager.get.mockResolvedValue(cachedQuote);

      const result = await service.getRandomQuote();

      expect(result).toEqual(cachedQuote);
      expect(mockCacheManager.get).toHaveBeenCalledWith('random-quote');
    });
  });
});
