import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../../app/app.module'
import {
     DATE_MUST_BE_ISO8601 , DATE_MUST_BE_BETWEEN_2010_AND_PRESENT
} from '../../validators/invalidConstants'
import {
    queryDate1997, queryDate2018,queryDateIsNumber,
    queryDateIsNotISO8601v1, queryDateIsNotISO8601v2, queryDateIsNotISO8601v3, queryDateIsNotISO8601v4,
} from './testQueries'


describe('API Tests: convert', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
            }),
        )
        await app.init()
    })

    it('should succeed', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDate2018)
            .expect(201)

        console.log(`*************** ${JSON.stringify({body: res.body})} ***************`);

        expect(res.body[0].source).toBe(queryDate2018.source)
        expect(res.body[0].destination).toBe(queryDate2018.destinations[0])
        expect(res.body[0].amount).toBe(queryDate2018.amount)
        expect(res.body[0].timestamp).toBeDefined()
        expect(res.body[0].rate).toBeDefined()
        expect(res.body[0].result).toBeDefined()
    })

    it('should fail: date is before 01/01/2010', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDate1997)
            .expect(400)

        expect(res.body.statusCode).toBe(400)
        expect(res.body.error).toBe('Bad Request')
        expect(res.body.message.length).toBe(1)
        expect(res.body.message[0]).toBe(`${DATE_MUST_BE_BETWEEN_2010_AND_PRESENT}. input: ${queryDate1997.date}`)
    })



    it('should fail: date is number', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateIsNumber)
            .expect(400)

        expect(res.body.statusCode).toBe(400)
        expect(res.body.error).toBe('Bad Request')
        expect(res.body.message.length).toBe(3)
        expect(res.body.message[0]).toBe('date must be a string')
    })

    it('should fail: date is not ISO8601 v1', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateIsNotISO8601v1)
            .expect(400)

        expect(res.body.statusCode).toBe(400)
        expect(res.body.error).toBe('Bad Request')
        expect(res.body.message.length).toBe(1)
        expect(res.body.message[0]).toBe(`${DATE_MUST_BE_ISO8601}. input: ${queryDateIsNotISO8601v1.date}`)
    })

    it('should fail: date is not ISO8601 v2', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateIsNotISO8601v2)
            .expect(400)

        const resultBody = JSON.parse(res.text)
        expect(resultBody.statusCode).toBe(400)
        expect(resultBody.error).toBe('Bad Request')
        expect(resultBody.message.length).toBe(1)
        expect(resultBody.message[0]).toBe(`${DATE_MUST_BE_ISO8601}. input: ${queryDateIsNotISO8601v2.date}`)
    })

    it('should fail: date is not ISO8601 v3', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateIsNotISO8601v3)
            .expect(400)

        expect(res.body.statusCode).toBe(400)
        expect(res.body.error).toBe('Bad Request')
        expect(res.body.message.length).toBe(1)
        expect(res.body.message[0]).toBe(`${DATE_MUST_BE_ISO8601}. input: ${queryDateIsNotISO8601v3.date}`)
    })

    it('should fail: date is not ISO8601 v4', async () => {
        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateIsNotISO8601v4)
            .expect(400)

        expect(res.body.statusCode).toBe(400)
        expect(res.body.error).toBe('Bad Request')
        expect(res.body.message.length).toBe(1)
        expect(res.body.message[0]).toBe(`${DATE_MUST_BE_ISO8601}. input: ${queryDateIsNotISO8601v4.date}`)
    })

    it('should succeed: date is a today', async () => {
        const queryDateToday = {
            source: 'USD',
            destinations: [
                'EUR',
            ],
            amount: 104,
            date: '2023-07-10',
        }

        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateToday)
            .expect(201)

        expect(res.body[0].source).toBe(queryDate2018.source)
        expect(res.body[0].destination).toBe(queryDate2018.destinations[0])
        expect(res.body[0].amount).toBe(queryDate2018.amount)
        expect(res.body[0].timestamp).toBeDefined()
        expect(res.body[0].rate).toBeDefined()
        expect(res.body[0].result).toBeDefined()
    })

    it('should fail: date is a future date', async () => {
        const queryDateTomorrow = {
            source: 'USD',
            destinations: [
                'EUR',
            ],
            amount: 104,
            date: '2050-01-01',
        }

        const res = await request(app.getHttpServer())
            .post('/convert')
            .send(queryDateTomorrow)
            .expect(400)

        expect(res.body.statusCode).toBe(400)
        expect(res.body.error).toBe('Bad Request')
        expect(res.body.message.length).toBe(1)
        expect(res.body.message[0]).toBe(`date must be between 1/1/2010 and present . input: ${queryDateTomorrow.date}`)
    })

    afterAll(async () => {
        await app.close()
    })
})
