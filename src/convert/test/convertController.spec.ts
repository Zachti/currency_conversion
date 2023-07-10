import { Test, TestingModule } from '@nestjs/testing'
import { ConvertController } from '../convert.controller'
import {AppModule} from "../../app/app.module";

describe('Convert Controller', () => {
    let controller: ConvertController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [AppModule]
        }).compile()

        controller = module.get<ConvertController>(ConvertController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})