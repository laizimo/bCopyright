const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'hello nodemon';
});

app.listen(3000);