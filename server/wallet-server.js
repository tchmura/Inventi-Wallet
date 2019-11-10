const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const uuid = require('uuidv4').default;
const app = new Koa();

let transactions = [
  {
    id: uuid(),
    name: 'first transaction',
    orientation: 'IN',
    amount: 485,
    currency: 'CZK',
    time: '14:56',
    date: new Date('2018-03-05').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'second transaction',
    orientation: 'OUT',
    amount: 48,
    currency: 'EUR',
    time: '09:06',
    date: new Date('2018-03-09').toISOString().substr(0, 10)
  },
  {
    id: uuid(),
    name: 'third transaction',
    orientation: 'IN',
    amount: 7900679897,
    currency: 'GBP',
    time: '20:34',
    date: new Date('2018-03-12').toISOString().substr(0, 10)
  }
];

const router = new Router();
router.get('/transactions', async ctx => {
  ctx.body = transactions;
});
router.put('/transactions/:id', KoaBody(), async ctx => {
  const id = ctx.params.id;
  const updatedItem = JSON.parse(ctx.request.body);
  const index = transactions.findIndex(i => i.id === id);
  if (index === -1) {
    ctx.status = 404;
  } else {
    transactions[index] = updatedItem;
    ctx.body = updatedItem;
  }
});
router.post('/transactions', KoaBody(), async ctx => {
  const newItem = JSON.parse(ctx.request.body);
  newItem.id = uuid();
  transactions.push(newItem);
  ctx.body = newItem;
  ctx.status = 201;
});
router.delete('/transactions/:id', async ctx => {
  const id = ctx.params.id;
  transactions = [...transactions.filter(i => i.id !== id)];
  ctx.status = 202;
  ctx.body = {};
});

app.use(router.routes());

app.listen(4000);
