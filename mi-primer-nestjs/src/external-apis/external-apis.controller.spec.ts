import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApisController } from './external-apis.controller';
import { ExternalApisService } from './external-apis.service';

describe('ExternalApisController', () => {
  let controller: ExternalApisController;
  let service: ExternalApisService;

  const mockExternalApisService = {
    getWeather: jest.fn(),
    getRandomQuote: jest.fn(),
    getCountryInfo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalApisController],
      providers: [
        {
          provide: ExternalApisService,
          useValue: mockExternalApisService
        }
      ]
    }).compile();

    controller = module.get<ExternalApisController>(ExternalApisController);
    service = module.get<ExternalApisService>(ExternalApisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data', async () => {
      const weatherData = {
        location: 'Madrid',
        temperature: 25,
        description: 'sunny',
        humidity: 60,
        windSpeed: 10
      };

      mockExternalApisService.getWeather.mockResolvedValue(weatherData);

      const result = await controller.getWeather('Madrid');

      expect(result).toEqual(weatherData);
      expect(mockExternalApisService.getWeather).toHaveBeenCalledWith('Madrid');
    });
  });

  describe('getRandomQuote', () => {
    it('should return a random quote', async () => {
      const quoteData = {
        text: 'Test quote',
        author: 'Test Author',
        category: 'Test Category'
      };

      mockExternalApisService.getRandomQuote.mockResolvedValue(quoteData);

      const result = await controller.getRandomQuote();

      expect(result).toEqual(quoteData);
      expect(mockExternalApisService.getRandomQuote).toHaveBeenCalled();
    });
  });

  describe('getCountryInfo', () => {
    it('should return country information', async () => {
      const countryData = {
        name: 'Spain',
        capital: 'Madrid',
        population: 47000000,
        area: 504000,
        currency: 'Euro'
      };

      mockExternalApisService.getCountryInfo.mockResolvedValue(countryData);

      const result = await controller.getCountryInfo('ES');

      expect(result).toEqual(countryData);
      expect(service.getCountryInfo).toHaveBeenCalledWith('ES');
    });
  });
});
