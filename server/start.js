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
    
    // Headers setting
    // app.use((req,res,next)=>{
    //     res.setHeader('Access-Control-Allow-Origin', "*");
    //     res.setHeader(
    //         'Access-control-Allow-Headers',
    //         'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //     res.setHeader(
    //         'Access-Control-Allow-Methods',
    //         'GET, POST, PATCH, DELETE, OPTIONS'
    //     );
    //     next();
    // });

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