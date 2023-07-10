import { Test, TestingModule } from '@nestjs/testing';
import { ConvertService } from '../convert.service';
import {AppModule} from "../../app/app.module";
import {ConvertModule} from "../convert.module";


describe('ConvertService', () => {
    let service: ConvertService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule , ConvertModule]
        }).compile();

        service = module.get<ConvertService>(ConvertService);
    });

    it('should return single conversion', async () => {
        const query = {
            source: 'USD',
            destinations: ['ILS'],
            amount: 10,
            date: '2023-05-27',
        };

        const result = await service.convert(query);

        expect(result.length).toBe(1);
        expect(result[0].source).toBe('USD');
        expect(result[0].destination).toBe('ILS');
    });

    it('should return invalid date format', async () => {
        const query = {
            source: 'USD',
            destinations: ['ILS'],
            amount: 10,
            date: '1212112211',
        };

        await expect(service.convert(query)).rejects.toThrow(
            'You have entered an invalid date. [Required format: date=YYYY-MM-DD]');

    });
});
