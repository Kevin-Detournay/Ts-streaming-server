import Koa from 'koa';
import config from 'config'
import router from './router'
import jwt from 'koa-jwt'
const app: Koa = new Koa();
const port = config.get("port") as string

app.on('error', () => {
})

app.use(jwt({
    secret:config.get('secret') as string,
    getToken(ctx: Koa.Context): string | null {
        return ctx.query.token as string
    }
}))

app.use(router.routes())

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});