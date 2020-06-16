const path = require('path');

const cors = require('@koa/cors');
const fs = require('fs');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const getPort = require('get-port');

async function runServer() {
    const port = await getPort({ port: 3000 });

    const app = new Koa();
    const router = new Router();

    router.get('/api/data', (ctx) => {
        const data = fs.readFileSync(path.join(__dirname, 'channels.json'), 'utf8');
        ctx.body = JSON.parse(data);
    })
    app.use(cors());
    app.use(koaStatic(path.join(__dirname, '..', 'src')));
    app.use(router.routes())
       .use(router.allowedMethods());
    app.listen(port);
    

    console.log(`server started at http://localhost:${port}/`);
}

runServer().catch(console.error);