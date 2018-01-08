import Koa from 'koa';

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000, () => {
  console.log('app listen on :localhose:3000')
});

export default app;