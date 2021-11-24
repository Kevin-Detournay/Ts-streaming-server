import Router from "koa-router";
import * as StreamController from './controllers/stream.controller'
import validateRequest from './middlewares/validator.middleware'
import {streamSchema} from "./schemas/streamSchema";


const router: Router = new Router()

router
    .prefix('/api')
    .get('/stream',validateRequest(streamSchema),StreamController.stream)

export default router