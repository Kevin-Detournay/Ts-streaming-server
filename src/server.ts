import Koa from 'koa';
import {extname, resolve} from 'path'
import {createReadStream, stat} from 'fs'
import {promisify} from "util";
import config from 'config'
import router from './router'

const app: Koa = new Koa();
const port = config.get("port") as string


app.on('error', () => {
})
app.use(router.routes())

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});