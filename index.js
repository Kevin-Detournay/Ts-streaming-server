import koa from 'koa'
import {extname,resolve} from 'path'
import {createReadStream,stat} from 'fs'
import {promisify} from "util";

const app = new koa()

app.use(async ({request, response},next)=>{
   if(!request.url.startsWith('/api/stream')) {
       return next()
   }

   const video = resolve('videos',request.query.video)
    const range = request.header.range
    if(!range){
        response.type=extname(video)
        response.body= createReadStream(video)
        return next()
    }
    const parts = range.replace('bytes=','').split('-')
    const start = parseInt(parts[0],10)
    const videoStats = await promisify(stat)(video)
    const end = parts[1] ? parseInt(parts[1],0) : videoStats.size -1
    console.log(start,end)

    response.set('Content-Range',`bytes ${start}-${end}/${videoStats.size}`)
    response.set('Accept-Ranges',`bytes`)
    response.set('Content-length')
    response.status = 206
    response.body =createReadStream(video,{start,end})

})
app.on('error',()=>{})

app.listen(49154, () => {
    console.log(`Listening on port 49154 !`)
});