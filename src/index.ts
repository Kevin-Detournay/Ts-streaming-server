import Koa from 'koa';
import {extname, resolve} from 'path'
import {createReadStream, stat} from 'fs'
import {promisify} from "util";
import config from 'config'

const app: Koa = new Koa();
const port = config.get("port") as string

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    if (!ctx.url.startsWith('/api/stream')) {
        return next()
    }
    const video = resolve('videos', ctx.query.video as string)
    const range = ctx.header.range
    if (!range) {
        ctx.type = extname(video)
        ctx.body = createReadStream(video)
        return next()
    }
    const parts = range.replace('bytes=', '').split('-')
    const start = parseInt(parts[0], 10)
    const videoStats = await promisify(stat)(video)
    const end = parts[1] ? parseInt(parts[1], 0) : videoStats.size - 1
    console.log(start, end)

    ctx.set('Content-Range', `bytes ${start}-${end}/${videoStats.size}`)
    ctx.set('Accept-Ranges', `bytes`)
    ctx.set('Content-length', (end - start + 1).toString(10))
    ctx.status = 206
    ctx.body = createReadStream(video, {start, end})

})
app.on('error', () => {
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});