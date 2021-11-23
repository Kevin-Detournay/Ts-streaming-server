import Router from "koa-router";
import * as StreamController from './controllers/stream.controller'
import validate from './middlewares/validator.middleware'
import {createStreamSchema} from "./schemas/stream.schema";


const router: Router = new Router()

router
    .prefix('/api')
    .get('/stream',validate(createStreamSchema),StreamController.stream)

export default router