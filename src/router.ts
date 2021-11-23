import Router from "koa-router";
import * as StreamController from './controllers/stream.controller'
import validateRequest from './middlewares/validator.middleware'
import {createStreamSchema} from "./schemas/stream.schema";


const router: Router = new Router()

router
    .prefix('/api')
    .get('/stream',validateRequest(createStreamSchema),StreamController.stream)

export default router