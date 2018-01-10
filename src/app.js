import Koa from 'koa';
import http from 'http';
import path from 'path';
import convert from 'koa-convert';
import Bodyparser from 'koa-bodyparser';
import Routes from './routes';
import json from 'koa-json';
import logger from 'koa-logger';
import config from './config';

const app = new Koa();
const bodyparser = Bodyparser();

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  await Routes.routes()(ctx, next);
});

app.use(async (ctx) => {
  ctx.status = 404;
  await ctx.render('404');
});

app.on('error', (err, ctx) => {
  console.log(`error happens : ${err}`);
});

const port = parseInt(config.port || '3000');

const server = http.createServer(app.callback());

server.listen(port);

server.on('error', (err) => {
  console.log('error happens: ' + err);
});

server.on('listening', () => {
  console.log('Listening on port: %d', port)
})

export default app;