import Router from "koa-router";
import * as StreamController from './controllers/stream.controller'

const router: Router = new Router()

router
    .prefix('/api')
    .get('/stream', StreamController.stream)

export default router